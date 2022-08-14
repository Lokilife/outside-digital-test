import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { compare, genHash } from 'src/util/password';

@Injectable()
export class AuthService {
  @Inject(UsersService)
  users: UsersService;

  @Inject(JwtService)
  jwt: JwtService;

  async signIn(data: CreateUserDto) {
    const passwordHash = await genHash(data.password);
    data.password = passwordHash;
    const user = await this.users.create(data);
    return this.getToken(user);
  }

  async validateUser(email: string, password: string) {
    const user = await this.users.findOneByEmail(email);

    if (!user || compare(password, user.password)) return false;

    return user;
  }

  async refreshToken(token: string) {
    const payload = this.jwt.decode(token);
    return this.jwt.sign(payload);
  }

  getToken(user: User) {
    return {
      token: this.jwt.sign({
        nickname: user.nickname,
        email: user.email,
        sub: user.id,
      }),
      expire: '1800',
    };
  }
}
