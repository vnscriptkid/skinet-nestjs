import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('login')
  @UseGuards(AuthGuard('local')) // call validate() of LocalStrategy
  async login(@Request() req) {
    return {
      user: req.user,
      token: 'token goes here',
    };
  }
}
