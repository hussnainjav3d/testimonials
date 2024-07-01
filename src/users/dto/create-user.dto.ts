import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsEmail()
  email: string;

  @IsString()
  org_id: string;

  @IsEnum(['EDITOR', 'READER', 'MANAGER', 'SUPER_USER'], {
    message:
      'Role must be one of the following: EDITOR, READER, MANAGER, SUPER_USER',
  })
  role: Role;
}
