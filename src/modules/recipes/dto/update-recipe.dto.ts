import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeRequestDto } from './create-recipe.dto';

export class UpdateRecipeRequestDto extends PartialType(
  CreateRecipeRequestDto,
) {}
