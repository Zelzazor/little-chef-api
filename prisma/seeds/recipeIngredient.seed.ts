import { RecipeIngredient } from '@prisma/client';

import { Seed } from './types';

const recipeIngredients: RecipeIngredient[] = [
  {
    id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    recipeId: 'a533c2fa-a445-4b88-bf99-5ec62a509dcb', // Replace with a valid Recipe id
    ingredientId: 'e32d0bf2-2fda-43d4-b3cd-f2f55523dcd4', // Replace with a valid Ingredient id
    measure_unit: 'grams',
    quantity: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: '61e2266c-dcf6-4a2a-8776-68c93b306c22',
    recipeId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', // Replace with a valid Recipe id
    ingredientId: 'bc9316c8-6a73-4c5c-9a94-d6b15b13b4b1', // Replace with a valid Ingredient id
    measure_unit: 'cups',
    quantity: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

export const recipeIngredientsSeed: Seed = {
  entity: 'recipeIngredient',
  data: recipeIngredients,
};
