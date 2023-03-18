import { SubmissionVote } from '@prisma/client';

import { Seed } from './types';

const submissionVote: SubmissionVote[] = [
  {
    id: 'e4f44b90-4479-433e-8600-ff23f8eacc4a',
    isUpvote: true,
    userId: 'd486121d-08b1-416d-a1a6-9e2ed0a695d7',
    submissionId: '6565b96c-9128-40c4-940a-f3fbf8358bcd',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: '72962902-9bde-4fa5-a0b8-117312206042',
    isUpvote: false,
    userId: 'd486121d-08b1-416d-a1a6-9e2ed0a695d7',
    submissionId: '5703026f-3c6b-4965-b94e-3e04e73ef157',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

export const submissionVoteSeed: Seed = {
  entity: 'submissionVote',
  data: submissionVote,
};
