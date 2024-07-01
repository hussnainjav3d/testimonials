import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  create(@Body() user: any) {
    return this.authService.registerUser(user);
  }
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() user: { email: string; password: string }) {
    return this.authService.signIn(user?.email, user?.password);
  }
}
