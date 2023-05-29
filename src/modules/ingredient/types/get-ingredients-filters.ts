import { BasePaginationQueryDto } from '../../../common/dto/base-pagination.query.dto';
import { GetIngredientsRequestDto } from '../dto/get-ingredients.request.dto';

export type GetIngredientsFilters = GetIngredientsRequestDto &
  BasePaginationQueryDto;
