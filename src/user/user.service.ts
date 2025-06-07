// src/user/user.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { KycStatus } from 'src/common/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user.
   * @param createUserDto The data for the new user, including plain password.
   * @returns The created user entity.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, name } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists.');
    }

    const passwordHash = await bcrypt.hash(password, 10); // Hash the password

    const newUser = this.userRepository.create({
      email,
      name,
      passwordHash,
      kycStatus: KycStatus.PENDING, // Default KYC status for new users
    });

    return this.userRepository.save(newUser);
  }

  /**
   * Finds all users.
   * @returns An array of user entities.
   */
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Finds a user by their ID.
   * @param id The ID of the user.
   * @returns The user entity, or null if not found.
   */
  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }
    return user;
  }

  /**
   * Finds a user by their email address.
   * @param email The email address of the user.
   * @returns The user entity, or null if not found.
   */
  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  /**
   * Updates an existing user.
   * @param id The ID of the user to update.
   * @param updateUserDto The data to update.
   * @returns The updated user entity.
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id); // Ensure user exists

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const emailExists = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (emailExists && emailExists.id !== id) {
        throw new BadRequestException('Another user with this email already exists.');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Merge the existing user with the update DTO, then save
    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  /**
   * Deletes a user by their ID.
   * @param id The ID of the user to delete.
   */
  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }
  }
}