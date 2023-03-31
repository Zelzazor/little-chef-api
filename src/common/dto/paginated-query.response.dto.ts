import { BasePaginationResponseDto } from './base-pagination.response.dto';

export class PaginatedQueryResponseDto<T> {
  data: T;
  pagination: BasePaginationResponseDto;
}
