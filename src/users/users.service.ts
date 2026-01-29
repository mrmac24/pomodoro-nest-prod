import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  //This service will handle User related operations
  // For Example: createUser, findUserById, updateUser, deleteUser, etc.

  // Example method to create a user
  async createUser(data: CreateUserDto): Promise<User> {
    // Logic to create a user in the database
    const newUser = this.userRepository.create(data);
    return await this.userRepository.save(newUser);
  }

  // Example method to find Email
  async findUserByEmail(email: string): Promise<any> {
    // Logic to find a user by email in the database
  }
}
