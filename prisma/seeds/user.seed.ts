import { User } from '@prisma/client';

import { Seed } from './types';

const user: User[] = [
  {
    id: '4b3f4191-b075-4124-aacb-b187eecf5c3e',
    name: 'John Doe',
    nickName: null,
    email: 'email@gmail.com',
    roleId: 'd69c6b14-0849-4f22-917a-e837e695ae05',
    subject: '',
    birthDate: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

export const userSeed: Seed = {
  entity: 'user',
  data: user,
};
