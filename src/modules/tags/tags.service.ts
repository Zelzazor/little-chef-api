import { Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { PaginatedQueryResponseDto } from 'src/common/dto/paginated-query.response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { GetTagsFilters } from './types/get-tags-filters';

@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) {}
  async create(createTagDto: CreateTagDto) {
    const tagType = await this.prismaService.tagType.findFirst({
      where: {
        name: 'Other',
      },
    });
    if (!tagType) return { success: false, message: 'Tag type not found' };

    const createdTag = await this.prismaService.tag.create({
      data: {
        name: createTagDto.name,
        tagType: {
          connect: {
            id: tagType.id,
          },
        },
      },
    });

    return { success: Boolean(createdTag) };
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
        orderBy: { createdAt: 'asc' },
        include: {
          tagType: true,
        },
      },
      { page: filters.page, pageSize: filters.pageSize },
    );
  }
}
