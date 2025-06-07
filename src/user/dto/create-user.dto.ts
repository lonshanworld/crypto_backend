// src/user/dto/create-user.dto.ts
import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { KycStatus } from 'src/common/enums';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  // Password will be hashed in the service layer, but we validate it here.
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  // This should typically be set by the system, not directly by a user's initial creation API
  // However, it's included for completeness if you have internal tools creating users with specific KYC statuses.
  @IsOptional()
  // @IsEnum(KycStatus, { message: 'Invalid KYC status' }) // Uncomment if you want to allow setting KYC on creation
  kycStatus?: KycStatus;
}