import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }

  getUserBySubject = async (subject: string): Promise<User> => {
    return this.prismaService.user.findUniqueOrThrow({ where: { subject } })
  }

  getUserById = async (id: string): Promise<User> => {
    return this.prismaService.user.findUniqueOrThrow({ where: { id } })
  }
}
