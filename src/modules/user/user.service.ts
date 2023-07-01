// user.service.ts
import { Injectable } from '@nestjs/common';
import { Role, User, Warning } from '@prisma/client';
import { BasePaginationQueryDto } from 'src/common/dto/base-pagination.query.dto';
import { PaginatedQueryResponseDto } from 'src/common/dto/paginated-query.response.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { GetDashboardMetricsRequestDto } from '../dashboard/dto/get-dashboard-metrics-request.dto';
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

  async getNewUserCount(body: GetDashboardMetricsRequestDto) {
    const count = await this.prismaService.user.count({
      where: {
        createdAt: {
          gte: body.dateRange?.startDate,
          lte: body.dateRange?.endDate,
        },
      },
    });

    return { count };
  }

  async getAllUsers({ page, pageSize }: BasePaginationQueryDto) {
    const data = await this.prismaService.findManyPaginated(
      'user',
      { include: { Role: true } },
      { page: page ?? 1, pageSize: pageSize ?? 10 },
    );
    return data;
  }

  async banUser(id: string): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: { bannedAt: new Date() },
    });
  }
  async unbanUser(id: string): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: { bannedAt: null },
    });
  }
  async getUserWarnings(
    id: string,
    { page, pageSize }: BasePaginationQueryDto,
  ): Promise<PaginatedQueryResponseDto<Warning[]>> {
    return this.prismaService.findManyPaginated(
      'warning',
      {
        where: { userId: id },
      },
      { page: page ?? 1, pageSize: pageSize ?? 10 },
    );
  }
  async addWarning(
    id: string,
    warning: { description: string },
  ): Promise<Warning> {
    return this.prismaService.warning.create({
      data: {
        ...warning,
        userId: id,
        viewed: false,
      },
    });
  }
}
