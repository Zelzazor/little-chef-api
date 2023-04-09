import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PaginatedQueryResponseDto } from '../common/dto/paginated-query.response.dto';
import { Pagination } from '../common/types/pagination';
import { applyMiddleware } from './softDelete.middleware';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    applyMiddleware(this);
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async findManyPaginated<T>(
    modelName: string,
    params: any,
    paginationOptions: Partial<Pagination>,
  ): Promise<PaginatedQueryResponseDto<T>> {
    const page = paginationOptions?.page || 1;
    const pageSize = paginationOptions?.pageSize || 10;

    const extendedParams = {
      ...params,
      skip: (page - 1) * pageSize,
      take: pageSize,
    };

    const model = this[modelName as keyof this] as any;

    const result = await model.findMany(extendedParams);

    const count = await model.count({ where: params.where });

    return {
      data: result,
      pagination: {
        page,
        pageSize,
        totalItems: count,
        totalPages: Math.ceil(count / pageSize),
      },
    };
  }
}
