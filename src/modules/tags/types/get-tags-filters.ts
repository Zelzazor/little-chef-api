import { BasePaginationQueryDto } from '../../../common/dto/base-pagination.query.dto';
import { GetTagsRequestDto } from '../dto/get-tags.request.dto';

export type GetTagsFilters = GetTagsRequestDto & BasePaginationQueryDto;
