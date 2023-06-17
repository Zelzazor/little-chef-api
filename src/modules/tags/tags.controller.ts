import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import { BasePaginationQueryDto } from '../../common/dto/base-pagination.query.dto';
import { Auth } from '../authz/auth.decorator';
import { Role } from '../authz/enums/role.enum';
import { CreateTagDto } from './dto/create-tag.dto';
import { GetTagsRequestDto } from './dto/get-tags.request.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post('create')
  @Auth(Role.Admin)
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Post()
  @HttpCode(200)
  findAll(
    @Query() query: BasePaginationQueryDto,
    @Body() body: GetTagsRequestDto,
  ) {
    return this.tagsService.findAll({ ...body, ...query });
  }
}
