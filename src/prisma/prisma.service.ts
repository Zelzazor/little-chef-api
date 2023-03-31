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

  async paginateQuery<T, U>(
    prismaQueryFn: (params: T) => Promise<U>,
    params: T,
    paginationOptions: BasePaginationRequestDto,
  ): Promise<PaginatedQueryResponseDto<U>> {
    const page = paginationOptions?.page || 1;
    const pageSize = paginationOptions?.pageSize || 10;

    const extendedParams = {
      ...params,
      skip: page || 1 * pageSize,
      take: pageSize,
    };

    console.log({ prismaQueryFn });
    const result = await prismaQueryFn(extendedParams);

    const modelName = Object.keys(this).find((key) => {
      const model = this[key as keyof PrismaClient] as any;
      return model?.findMany === prismaQueryFn;
    }) as keyof PrismaClient;

    const count = await (this[modelName] as any).count(params);

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
