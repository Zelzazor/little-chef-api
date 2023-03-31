import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BasePaginationRequestDto } from '../common/dto/base-pagination.query.dto';
import { PaginatedQueryResponseDto } from '../common/dto/paginated-query.response.dto';
import { applyMiddleware } from './softDelete.middleware';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // constructor() {
  //   super({ log: ['query', 'info'] });
  // }

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
    paginationOptions: BasePaginationRequestDto,
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

    const count = await model.count(params);

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
