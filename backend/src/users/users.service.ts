import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.request';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'generated/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  // Persist user in database
  async createUser(data: CreateUserDTO): Promise<Partial<User>> {
    try {
      return await this.prismaService.user.create({
        data: {
          username: data.username,
          email: data.email,
          password: await bcrypt.hash(data.password, 10),
        },
        select: {
          id: true,
          username: true,
          email: true,
        },
      });
    } catch (err) {
      if (err.code === 'P2002') {
        throw new UnprocessableEntityException('Email already exists');
      }
      throw err;
    }
  }
}
