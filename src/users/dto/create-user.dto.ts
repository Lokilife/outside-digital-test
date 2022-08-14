import { IsEmail, IsString, Matches, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsString()
  @MaxLength(100)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, {
    message:
      'Your password should have at least 8 characters; contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  password: string;

  @IsString()
  @MaxLength(30)
  nickname: string;
}
