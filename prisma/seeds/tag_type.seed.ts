import { TagType } from '@prisma/client';

import { Seed } from './types';

const tagTypes: TagType[] = [
  {
    id: 'fad4fa4e-b846-4e1b-abd7-a96a7b8d3567',
    name: 'Difficulty',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

export const tagTypesSeed: Seed = {
  entity: 'tagType',
  data: tagTypes,
};
