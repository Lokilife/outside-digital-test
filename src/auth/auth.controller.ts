import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { JWTAuthGuard } from './jwt-auth.guard';

// Список API endpoint
//     POST /signin
// {
//   "email": "example@exe.com",
//   "password": "example",
//   "nickname": "nickname"
// }
// Валидировать password, email, nickname
// RETURN:
// {
//   "token": "token",
//   "expire": "1800"
// }

//     POST /login
// {
//   "email": "example@exe.com",
//   "password": "example"
// }
// RETURN:
// {
//   "token": "token",
//   "expire": "1800"
// }

//     POST /logout
//     HEADER: Authorization: Bearer {token}

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  auth: AuthService;

  @Post('signin')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
    type: TokenResponseDto,
  })
  async signIn(@Body() data: CreateUserDto) {
    return this.auth.signIn(data);
  }

  @UseGuards(JWTAuthGuard)
  @Post('refresh-token')
  @ApiResponse({
    status: 200,
    description: 'Token refreshed',
    type: TokenResponseDto,
  })
  async refreshToken(@Req() req: any) {
    return this.auth.refreshToken(req.headers.authorization);
  }

  // Я не понял как должен работать logout на бекенде, я обычно обнуляю токен на фронте
  // @Post('logout')
  // async logout() {
  //   return 'logout';
  // }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in',
    type: TokenResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid credentials',
  })
  async login(@Body() data: LoginDto) {
    const user = await this.auth.validateUser(data.email, data.password);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    return this.auth.getToken(user);
  }
}
