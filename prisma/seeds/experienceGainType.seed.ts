import { ExperienceGainType } from '@prisma/client';

import { Seed } from './types';

const experienceGainTypes: ExperienceGainType[] = [
  {
    id: 'ffb1bf04-6841-499d-ba4b-2227ea062a1e',
    name: 'Submission',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: '9298cefd-4796-4f6e-8c18-e57fc2faf55a',
    name: 'Vote',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

export const experienceGainTypeSeed: Seed = {
  entity: 'experienceGainType',
  data: experienceGainTypes,
};
