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
  {
    id: 'd486121d-08b1-416d-a1a6-9e2ed0a695d7',
    name: 'Galcake',
    nickName: null,
    email: 'nenas92799@galcake.com',
    roleId: 'd69c6b14-0849-4f22-917a-e837e695ae05',
    subject: 'auth0|64162e0d739976b7470d665f',
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
