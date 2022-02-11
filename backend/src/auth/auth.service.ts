import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  getToken(user: User) {
    return this.jwtService.sign({
      email: user.email,
      sub: user.id, // `sub` is conventional-naming
    });
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(
      password,
      parseInt(this.configService.get('SALT_ROUNDS')),
    );
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const existingUser = await this.userService.findByEmail(
      registerUserDto.email,
    );

    if (existingUser)
      throw new BadRequestException(
        `Email '${registerUserDto.email}' already exists.`,
      );

    const user = await this.userService.create({
      ...registerUserDto,
      password: await this.hashPassword(registerUserDto.password),
    });

    return user;
  }
}
