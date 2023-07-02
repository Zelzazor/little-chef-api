import { TagExperience } from '@prisma/client';

import { Seed } from './types';

const tagsExperience: TagExperience[] = [
  {
    id: 'da4c1c0e-587c-4e01-8267-779c13164b0f',
    experienceAmount: 25,
    tagId: 'e32d0bf2-2fda-43d4-b3cd-f2f55523dcd4',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 'ca4d1162-e572-4316-b207-5aaa0f2e3c12',
    experienceAmount: 50,
    tagId: 'bc9316c8-6a73-4c5c-9a94-d6b15b13b4b1',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: '50dee493-43eb-4ea1-8ec4-fd1132f257f7',
    experienceAmount: 100,
    tagId: 'fad4fa4e-b846-4e1b-abd7-a96a7b8d3567',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

export const tagsExperienceSeed: Seed = {
  entity: 'tagExperience',
  data: tagsExperience,
};
