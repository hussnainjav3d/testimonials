import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registerUser(user: CreateUserDto) {
    try {
      const hashPassword = await bcrypt.hash(user.password, 10);
      const newUser = await this.userService.create({
        ...user,
        password: hashPassword,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = newUser;
      return newUser;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    try {
      const user: any = await this.userService.findOneByEmail(email);
      if (!user) {
        throw new UnauthorizedException();
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, email: user.email, name: user.name };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new UnauthorizedException(`invalid Credentials`);
    }
  }
}
