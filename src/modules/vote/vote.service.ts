import { Injectable } from '@nestjs/common';
import { Submission, SubmissionStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ExperienceService } from '../experience/experience.service';
import { GetRandomUnvotedSubmissionResponseDto } from './dto/get-random-unvoted-submission.response.dto';
import { VoteSubmissionResponseDTO } from './dto/vote-submission.response.dto';

@Injectable()
export class VoteService {
  constructor(
    private prismaService: PrismaService,
    private experienceService: ExperienceService,
  ) {}

  async voteSubmission(
    userId: string,
    submissionId: string,
    isUpvote: boolean,
  ): Promise<VoteSubmissionResponseDTO> {
    await this.prismaService.submissionVote.create({
      data: { userId, submissionId, isUpvote: !!isUpvote },
    });

    this.prismaService.submissionVote
      .findMany({
        where: { submissionId },
      })
      .then((submissionVotes) => {
        const upvotes = submissionVotes.filter((vote) => vote.isUpvote).length;
        const downvotes = submissionVotes.filter(
          (vote) => !vote.isUpvote,
        ).length;

        let status: SubmissionStatus = SubmissionStatus.PENDING;

        if (upvotes >= 3) status = SubmissionStatus.APPROVED;
        if (downvotes >= 3) status = SubmissionStatus.REJECTED;

        if (status !== SubmissionStatus.PENDING) {
          this.prismaService.submission
            .update({
              where: {
                id: submissionId,
              },
              data: {
                status,
              },
            })
            .then((result) => result);
        }

        if (status === SubmissionStatus.REJECTED) {
          this.reduceExperience({ userId, submissionId });
        }
      });

    return { success: true };
  }

  async reduceExperience({
    userId,
    submissionId,
  }: {
    userId: string;
    submissionId: string;
  }) {
    const experienceGainType =
      await this.prismaService.experienceGainType.findFirst({
        where: { name: 'Vote' },
      });

    const submission = await this.prismaService.submission.findUnique({
      where: { id: submissionId },
      include: {
        recipe: {
          include: {
            tags: {
              include: {
                tag: {
                  include: {
                    tagExperience: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const difficultyTag = submission?.recipe.tags
      .map((tag) => tag.tag)
      .find((tag) => tag.tagExperience);

    if (difficultyTag) {
      await this.experienceService.addExperience({
        userId,
        amount: difficultyTag.tagExperience?.experienceAmount
          ? -difficultyTag.tagExperience?.experienceAmount
          : 0,
        submissionId,
        experienceGainTypeId: experienceGainType?.id ?? '',
      });
    }
    return { success: true };
  }

  async getRandomUnvotedSubmission(
    id: string,
  ): Promise<GetRandomUnvotedSubmissionResponseDto> {
    const submissionsWithoutVotes =
      await this.prismaService.submission.findMany({
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
