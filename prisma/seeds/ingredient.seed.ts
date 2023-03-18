import { Ingredient } from '@prisma/client';

import { Seed } from './types';

const ingredients: Ingredient[] = [
  {
    id: 'e32d0bf2-2fda-43d4-b3cd-f2f55523dcd4',
    name: 'Flour',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 'bc9316c8-6a73-4c5c-9a94-d6b15b13b4b1',
    name: 'Sugar',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 'fad4fa4e-b846-4e1b-abd7-a96a7b8d3567',
    name: 'Eggs',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

export const ingredientsSeed: Seed = {
  entity: 'ingredient',
  data: ingredients,
};
