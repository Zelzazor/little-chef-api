import { Type } from 'class-transformer';
import { IsNumber, IsString, IsUUID, ValidateNested } from 'class-validator';
import { BaseTransactionalOperationResponseDto } from '../../../common/dto/base-transactional-operation.response.dto';

export class CreateRecipeRequestDto {
  @IsString()
  name: string;

  @IsString()
  recipeSteps: string;

  @ValidateNested()
  @Type(() => RecipeIngredientRequestDto)
  recipeIngredients: RecipeIngredientRequestDto[];

  @IsUUID(4, { each: true })
  tags: string[];
}

class RecipeIngredientRequestDto {
  @IsUUID()
  ingredientId: string;

  @IsNumber()
  quantity: number;

  @IsString()
  measure_unit: string;
}

export class CreateRecipeResponseDto extends BaseTransactionalOperationResponseDto {}
