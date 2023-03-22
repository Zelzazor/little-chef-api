import { Submission, SubmissionStatus } from '@prisma/client';

import { Seed } from './types';

const submission: Submission[] = [
  {
    id: '24421f0b-3c52-402b-86e2-1902d50c1884',
    imageUrl: '',
    status: SubmissionStatus.APPROVED,
    recipeId: '61e2266c-dcf6-4a2a-8776-68c93b306c22',
    userId: '4b3f4191-b075-4124-aacb-b187eecf5c3e',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: '5703026f-3c6b-4965-b94e-3e04e73ef157',
    imageUrl: '',
    status: SubmissionStatus.REJECTED,
    recipeId: '61e2266c-dcf6-4a2a-8776-68c93b306c22',
    userId: '4b3f4191-b075-4124-aacb-b187eecf5c3e',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: '6565b96c-9128-40c4-940a-f3fbf8358bcd',
    imageUrl: '',
    status: SubmissionStatus.PENDING,
    recipeId: '61e2266c-dcf6-4a2a-8776-68c93b306c22',
    userId: '4b3f4191-b075-4124-aacb-b187eecf5c3e',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 'e8cb51f8-7335-4e85-9473-3aa480fe6010',
    imageUrl: '',
    status: SubmissionStatus.PENDING,
    recipeId: '61e2266c-dcf6-4a2a-8776-68c93b306c22',
    userId: '4b3f4191-b075-4124-aacb-b187eecf5c3e',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: '4017d365-09a3-4f4f-a52e-f1414da0d39b',
    imageUrl: '',
    status: SubmissionStatus.PENDING,
    recipeId: '61e2266c-dcf6-4a2a-8776-68c93b306c22',
    userId: '4b3f4191-b075-4124-aacb-b187eecf5c3e',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

export const submissionSeed: Seed = {
  entity: 'submission',
  data: submission,
};
