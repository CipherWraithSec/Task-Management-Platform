import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    // configure strategy
    super({ usernameField: 'email' });
  }

  // Validate user credentials. The result will be set as the user property on every request object.
  async validate(username: string, password: string) {
    return this.authService.verifyUser(username, password);
  }
}
