import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  @Inject(AuthService)
  auth: AuthService;

  async validate(username: string, password: string) {
    const user = await this.auth.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
