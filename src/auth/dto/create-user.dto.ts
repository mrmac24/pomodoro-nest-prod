import { MinLength, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  lastName: string;

  @IsString()
  firstName: string;
}
