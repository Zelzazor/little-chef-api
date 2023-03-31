import { Submission } from '@prisma/client';

export class GetSubmissionsResponseDto extends Array<Submission> {}
