import { Injectable } from '@nestjs/common';
import { Status as SubmissionStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
@Injectable()
export class VoteService {
  constructor(private prisma: PrismaService) {}
  async voteSubmission(
    userId: string,
    submissionId: string,
    isUpvote: boolean,
  ) {
    const test = await this.prisma.submissionVote.create({
      data: { userId, submissionId, isUpvote: !!isUpvote },
    });
    console.log(test);
    return { msg: 'submission voted' };
  }

  async randomUnvotedSubmission(id: string) {
    const submissionsWithoutVotes = await this.prisma.submission.findMany({
      select: {
        id: true,
        imageUrl: true,
        recipeId: true,
        createdAt: true,
        updatedAt: true,
      },
      take: 5,
      where: {
        votes: { none: { userId: id } },
        status: SubmissionStatus.PENDING,
      },
    });

    const randomIndex = Math.floor(
      Math.random() * submissionsWithoutVotes.length,
    );
    const unvotedSubmission = submissionsWithoutVotes[randomIndex];

    return unvotedSubmission;
  }
}
