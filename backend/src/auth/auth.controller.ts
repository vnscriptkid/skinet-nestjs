import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local')) // call validate() of LocalStrategy
  async login(@CurrentUser() user: User) {
    return {
      user: user,
      token: this.authService.getToken(user),
    };
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getCurrentUser(@CurrentUser() user: User) {
    return user;
  }
}
