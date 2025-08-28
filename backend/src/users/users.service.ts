import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'generated/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  // Persist user in database
  async createUser(data: CreateUserRequest): Promise<User> {
    try {
      return await this.prismaService.user.create({
        data: {
          ...data,
          password: await bcrypt.hash(data.password, 10),
        },
      });
    } catch (err) {
      console.log('The Error:', err);
      throw err;
    }
  }
}
