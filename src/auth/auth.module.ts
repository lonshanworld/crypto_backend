// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module'; // Ensure correct path to UserModule
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule, // UserModule is needed to use UserService for user validation
    PassportModule, // For Passport integration
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        if (!jwtSecret) {
          throw new Error('JWT_SECRET is not defined in environment variables.');
        }
        return {
          secret: jwtSecret,
          signOptions: { expiresIn: '60m' }, // Token expiration time (e.g., 60 minutes)
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService], // Export AuthService if needed by other modules (e.g., for testing)
})
export class AuthModule {}