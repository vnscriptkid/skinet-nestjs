import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  public async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new UnauthorizedException();

    // if (user.password !== password) throw new UnauthorizedException();
    const matchedPasswords = await bcrypt.compare(password, user.password);

    if (!matchedPasswords) throw new UnauthorizedException();

    return user;
  }
}
