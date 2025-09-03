import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from 'generated/prisma';
import { Response } from 'express';
import ms from 'ms';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './tokenPayload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  // use cookies to set JWT on outgoing response
  async login(user: User, response: Response) {
    // set expiry date
    const expires = new Date();
    expires.setMilliseconds(
      expires.getMilliseconds() +
        parseInt(ms(this.configService.getOrThrow('JWT_EXPIRATION'))),
    );

    const tokenPayload: TokenPayload = {
      userId: user.id,
      username: user.username,
    };

    // generate a token
    const token = this.jwtService.sign(tokenPayload);

    // set it on outgoing response as a cookie
    response.cookie('Authentication', token, {
      secure: false, // transmit only via https
      httpOnly: true, // only be available to server requests
      expires, // cookie expires as soon as jwt expires
    });

    return { tokenPayload };
  }

  async verifyUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.getUser({ email });

      console.log('The USER:', user);
      // verify password
      const authenticated = await bcrypt.compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
