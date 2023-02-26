import { Role } from '@prisma/client';

import { Seed } from './types';

const roles: Role[] = [
  {
    id: 'd69c6b14-0849-4f22-917a-e837e695ae05',
    name: 'User',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: '2366347a-b6f4-4380-b016-9f74da12309f',
    name: 'Admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

export const rolesSeed: Seed = {
  entity: 'role',
  data: roles,
};
