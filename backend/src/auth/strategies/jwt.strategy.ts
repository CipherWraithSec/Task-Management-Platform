import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../tokenPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    // configure strategy
    super({
      // extract JWT on the request
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies.Authentication,
      ]),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  // receives the incoming token payload or decoded JWT.
  validate(payload: TokenPayload) {
    return payload;
  }
}
