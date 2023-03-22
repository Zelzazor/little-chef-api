import { Recipe } from '@prisma/client';

import { Seed } from './types';

const recipes: Recipe[] = [
  {
    id: 'a533c2fa-a445-4b88-bf99-5ec62a509dcb',
    name: 'Example Recipe',
    imageUrl: 'https://example.com/recipe-image.jpg',
    recipeSteps:
      'Step 1: Prepare ingredients.\nStep 2: Cook the dish.\nStep 3: Serve and enjoy!',
    views: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: '61e2266c-dcf6-4a2a-8776-68c93b306c22',
    name: 'Another Example Recipe',
    imageUrl: 'https://example.com/another-recipe-image.jpg',
    recipeSteps:
      'Step 1: Gather ingredients.\nStep 2: Follow cooking instructions.\nStep 3: Plate and serve.',
    views: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

export const recipesSeed: Seed = {
  entity: 'recipe',
  data: recipes,
};
