import { Body, Controller, Get, Query } from '@nestjs/common';
import { BasePaginationQueryDto } from '../../common/dto/base-pagination.query.dto';
import { PaginatedQueryResponseDto } from '../../common/dto/paginated-query.response.dto';
import { GetIngredientsResponseDto } from './dto/get-ingredents.response.dto';
import { GetIngredientsRequestDto } from './dto/get-ingredients.request.dto';
import { IngredientService } from './ingredient.service';

@Controller('ingredient')
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}

  @Get()
  async getIngredients(
    @Query() query: BasePaginationQueryDto,
    @Body() body: GetIngredientsRequestDto,
  ): Promise<PaginatedQueryResponseDto<GetIngredientsResponseDto>> {
    return this.ingredientService.getIngredients({ ...body, ...query });
  }
}
