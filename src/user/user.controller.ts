// src/user/user.controller.ts
import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import JwtAuthGuard

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post() // Public endpoint for user registration
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard) // Protect this endpoint with JWT
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard) // Protect this endpoint
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOneById(+id);
  }

  // Add update and delete methods as needed, protected by JwtAuthGuard
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content for successful deletion
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(+id);
  }
}