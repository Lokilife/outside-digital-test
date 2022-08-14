import { Inject, Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TagsService {
  @Inject(PrismaService)
  prisma: PrismaService;

  create(data: Tag) {
    return this.prisma.tag.create({ data });
  }

  findOne(id: number) {
    return this.prisma.tag.findFirst({
      where: { id },
      include: {
        creator: true,
      },
    });
  }

  update(id: number, data: Partial<Tag>) {
    return this.prisma.tag.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.tag.delete({ where: { id } });
  }

  async findMany({
    sortBy = 'name',
    offset,
    length,
  }: {
    sortBy?: 'name' | 'order';
    offset?: number;
    length?: number;
  }) {
    const tags = await this.prisma.tag.findMany({
      orderBy: {
        [sortBy]: 'asc',
      },
      skip: offset,
      take: length,
      include: {
        creator: true,
      },
    });
    return {
      data: tags,
      meta: {
        offset,
        length,
        quantity: await this.prisma.tag.count(),
      },
    };
  }
}
