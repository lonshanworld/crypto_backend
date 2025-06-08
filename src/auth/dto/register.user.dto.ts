// src/auth/dto/login-user.dto.ts

// src/auth/dto/register-user.dto.ts
import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}