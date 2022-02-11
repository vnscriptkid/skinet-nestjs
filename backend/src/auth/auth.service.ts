import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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
}
