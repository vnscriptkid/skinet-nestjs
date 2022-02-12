import { AuthGuardLocal } from './guards/auth-jwt.guard';
import { AuthGuardJwt } from './guards/auth-local.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { RegisterUserDto } from './dtos/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuardLocal) // call validate() of LocalStrategy
  async login(@CurrentUser() user: User) {
    return {
      email: user.email,
      displayName: user.displayName,
      token: this.authService.getToken(user),
    };
  }

  @Get('me')
  @UseGuards(AuthGuardJwt)
  async getCurrentUser(@CurrentUser() user: User) {
    return {
      email: user.email,
      displayName: user.displayName,
      token: this.authService.getToken(user),
    };
  }

  @Get('emailexists')
  async checkEmailExists(@Query('email') email: string) {
    const user = await this.userService.findByEmail(email);

    return !!user;
  }

  @Get('address')
  @UseGuards(AuthGuardJwt)
  async getUserAddress(@CurrentUser() user: User) {
    return (await this.userService.findAddress(user))?.address;
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.authService.register(registerUserDto);

    return {
      email: user.email,
      displayName: user.displayName,
      token: this.authService.getToken(user),
    };
  }
}
