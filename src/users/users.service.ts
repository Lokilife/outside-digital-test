import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  @Inject(PrismaService)
  prisma: PrismaService;

  findOne(nickname: string) {
    return this.prisma.user.findFirst({ where: { nickname } });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  update(id: string, data: Partial<CreateUserDto>) {
    return this.prisma.user.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  updateTags(id: string, tags: number[]) {
    return this.prisma.user.update({
      where: { id },
      data: {
        tags: {
          set: tags.map((tag) => ({ id: tag })),
        },
      },
      include: {
        tags: true,
      },
    });
  }
}
