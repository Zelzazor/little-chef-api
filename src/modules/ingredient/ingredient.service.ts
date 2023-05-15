import { Injectable } from '@nestjs/common';
import { PaginatedQueryResponseDto } from '../../common/dto/paginated-query.response.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { GetIngredientsResponseDto } from './dto/get-ingredents.response.dto';
import { GetIngredientsFilters } from './types/get-ingredients-filters';

@Injectable()
export class IngredientService {
  constructor(private prismaService: PrismaService) {}

  async getIngredients(
    filters: GetIngredientsFilters,
  ): Promise<PaginatedQueryResponseDto<GetIngredientsResponseDto>> {
    return await this.prismaService.findManyPaginated(
      'ingredient',
      {
        where: {
          id: filters.id,
          name: {
            contains: filters.name,
            mode: 'insensitive',
          },
          createdAt: {
            gte: filters.dateRange?.startDate,
            lte: filters.dateRange?.endDate,
          },
          deletedAt: filters.deleted
            ? {
                lte: new Date(),
              }
            : undefined,
        },
        orderBy: { name: 'asc' },
      },
      { page: filters.page, pageSize: filters.pageSize },
    );
  }
}
