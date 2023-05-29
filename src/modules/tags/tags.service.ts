import { Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { PaginatedQueryResponseDto } from 'src/common/dto/paginated-query.response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { GetTagsFilters } from './types/get-tags-filters';

@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) {}
  create(createTagDto: CreateTagDto) {
    return 'This action adds a new tag';
  }

  async findAll(
    filters: GetTagsFilters,
  ): Promise<PaginatedQueryResponseDto<Tag[]>> {
    return await this.prismaService.findManyPaginated(
      'tag',
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
        include: {
          tagType: true,
        },
      },
      { page: filters.page, pageSize: filters.pageSize },
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
