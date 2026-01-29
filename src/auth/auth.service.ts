import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(createUserDTO: CreateUserDto) {
    // encrypt the user password here
    // for example, using bcrypt
    const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);
    createUserDTO.password = hashedPassword;

    const user = await this.usersService.createUser(createUserDTO);
    return this.jwtService.sign({ id: user.id, email: user.email });
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findUserByEmail(loginDto.email);
    // If user not found or password does not match, throw an error
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.jwtService.sign({ id: user.id, email: user.email });
  }
}
