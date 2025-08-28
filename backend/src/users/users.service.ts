import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';

@Injectable()
export class UsersService {
  // Create a new user
  createUser(data: CreateUserRequest) {}
}
