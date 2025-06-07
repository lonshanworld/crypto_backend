import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Register the User entity with TypeORM, making UserRepository available IN THIS MODULE
    PassportModule, // Import PassportModule for authentication mechanisms
  ],
  providers: [UserService], // Register UserService as a provider
  controllers: [UserController], // Register UserController as a controller
  // FIX: Export UserService so it can be used in other modules (e.g., AuthModule)
  // If other modules were directly injecting UserRepository, you would also export TypeOrmModule here,
  // but it's generally better to expose services.
  exports: [UserService, TypeOrmModule], // Export UserService and TypeOrmModule.forFeature for User
})
export class UserModule {}
