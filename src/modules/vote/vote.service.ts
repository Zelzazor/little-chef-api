import { Injectable } from '@nestjs/common';
import { Submission, SubmissionStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { GetRandomUnvotedSubmissionResponseDto } from './dto/get-random-unvoted-submission.response.dto';
import { VoteSubmissionResponseDTO } from './dto/vote-submission.response.dto';

@Injectable()
export class VoteService {
  constructor(private prisma: PrismaService) {}

  async voteSubmission(
    userId: string,
    submissionId: string,
    isUpvote: boolean,
  ): Promise<VoteSubmissionResponseDTO> {
    await this.prisma.submissionVote.create({
      data: { userId, submissionId, isUpvote: !!isUpvote },
    });

    const submissionUpvoteCount = await this.prisma.submissionVote.count({
      where: { submissionId, isUpvote: true },
    });

    const submissionDownvoteCount = await this.prisma.submissionVote.count({
      where: { submissionId, isUpvote: false },
    });

    if (submissionUpvoteCount >= 3)
      await this.prisma.submission.update({
        where: {
          id: submissionId,
        },
        data: {
          status: SubmissionStatus.APPROVED,
        },
      });

    if (submissionDownvoteCount >= 3)
      await this.prisma.submission.update({
        where: {
          id: submissionId,
        },
        data: {
          status: SubmissionStatus.REJECTED,
        },
      });

    return { success: true };
  }

  async getRandomUnvotedSubmission(
    id: string,
  ): Promise<GetRandomUnvotedSubmissionResponseDto> {
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

    return { submission: unvotedSubmission as Submission };
  }
}
