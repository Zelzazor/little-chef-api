import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserResponseDto } from './dto/update-user.response.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  getUserBySubject = async (
    subject: string,
  ): Promise<User & { Role: Role }> => {
    return this.prismaService.user.findUniqueOrThrow({
      where: { subject },
      include: { Role: true },
    });
  };

  getUserById = async (id: string): Promise<User & { Role: Role }> => {
    return this.prismaService.user.findUniqueOrThrow({
      where: { id },
      include: { Role: true },
    });
  };

  updateUser = async (
    updatedUser: Partial<User>,
  ): Promise<UpdateUserResponseDto> => {
    await this.prismaService.user.update({
      where: { subject: updatedUser.subject },
      data: { ...updatedUser },
    });

    return { success: true };
  };
}
