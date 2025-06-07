// src/user/dto/update-user.dto.ts
import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types'; // Or @nestjs/swagger if you prefer
import { CreateUserDto } from './create-user.dto';
import { KycStatus } from 'src/common/enums';

// PartialType makes all fields of CreateUserDto optional
export class UpdateUserDto extends PartialType(CreateUserDto) {
  // You might want to prevent email changes or require re-verification
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' }) // Still not empty if provided
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password?: string; // This would be the new plain password, to be hashed

  @IsOptional()
  @IsEnum(KycStatus, { message: 'Invalid KYC status' })
  kycStatus?: KycStatus;
}