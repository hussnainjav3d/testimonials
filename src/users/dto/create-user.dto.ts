import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;

  @IsEnum(['EDITOR', 'READER', 'MANAGER'], {
    message: 'Role must be one of the following: EDITOR, READER, MANAGER',
  })
  role: Role;
}
