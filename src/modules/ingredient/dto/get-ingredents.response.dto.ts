import { Ingredient } from '@prisma/client';

export class GetIngredientsResponseDto extends Array<Ingredient> {}
