import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from 'generated/prisma';

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

  // Find user by unique field
  async getUser(filter: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUniqueOrThrow({
      where: filter,
    });
  }
}
