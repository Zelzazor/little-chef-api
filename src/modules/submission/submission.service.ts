import { Injectable } from '@nestjs/common';
import { Submission } from '@prisma/client';
import { PaginatedQueryResponseDto } from '../../common/dto/paginated-query.response.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { GetDashboardMetricsRequestDto } from '../dashboard/dto/get-dashboard-metrics-request.dto';
import { ExperienceService } from '../experience/experience.service';
import { CreateSubmissionResponseDto } from './dto/create-submission.response.dto';
import { DeleteSubmissionResponseDto } from './dto/delete-submission.response.dto';
import { GetSubmissionsResponseDto } from './dto/get-submissions.response.dto';
import { UpdateSubmissionRequestDto } from './dto/update-submission.request.dto';
import { UpdateSubmissionResponseDto } from './dto/update-submission.response.dto';
import { GetSubmissionFilters } from './types/get-submission-filters';

@Injectable()
export class SubmissionService {
  constructor(
    private prismaService: PrismaService,
    private experienceService: ExperienceService,
  ) {}

  async getSubmissions(
    filters: GetSubmissionFilters,
  ): Promise<PaginatedQueryResponseDto<GetSubmissionsResponseDto>> {
    return await this.prismaService.findManyPaginated(
      'submission',
      {
        where: {
          id: filters.id,
          userId: filters.userId,
          recipeId: filters.recipeId,
          createdAt: {
            gte: filters.dateRange?.startDate,
            lte: filters.dateRange?.endDate,
          },
          deletedAt: filters.deleted
            ? {
                lte: new Date(),
              }
            : undefined,
        },
        include: {
          user: { select: { id: true, nickName: true, name: true } },
          recipe: { select: { id: true, name: true, imageUrl: true } },
          votes: { select: { id: true, isUpvote: true } },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      { page: filters.page, pageSize: filters.pageSize },
    );
  }

  async addExperience(createdSubmission: Submission) {
    const experienceGainType =
      await this.prismaService.experienceGainType.findFirst({
        where: { name: 'Submission' },
      });

    const getSubmission = await this.prismaService.submission.findUnique({
      where: { id: createdSubmission.id },
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

    const difficultyTag = getSubmission?.recipe.tags
      .map((tag) => tag.tag)
      .find((tag) => tag.tagExperience);

    if (difficultyTag) {
      await this.experienceService.addExperience({
        userId: createdSubmission.userId,
        amount: difficultyTag.tagExperience?.experienceAmount ?? 0,
        submissionId: createdSubmission.id,
        experienceGainTypeId: experienceGainType?.id ?? '',
      });
    }

    return { success: true };
  }

  async createSubmission(
    submission: Partial<Submission>,
  ): Promise<CreateSubmissionResponseDto> {
    const createdSubmission = await this.prismaService.submission.create({
      data: {
        ...(submission as Submission),
      },
    });

    this.addExperience(createdSubmission);

    return { success: Boolean(createdSubmission) };
  }

  async updateSubmission(
    id: string,
    updatedSubmission: UpdateSubmissionRequestDto,
  ): Promise<UpdateSubmissionResponseDto> {
    const resultingSubmission = await this.prismaService.submission.update({
      where: { id },
      data: { ...updatedSubmission },
    });

    return { success: Boolean(resultingSubmission) };
  }

  async deleteSubmission(id: string): Promise<DeleteSubmissionResponseDto> {
    const deletedSubmission = await this.prismaService.submission.delete({
      where: { id },
    });

    return { success: Boolean(deletedSubmission) };
  }
  async countSubmissionDate(body: GetDashboardMetricsRequestDto) {
    const count = await this.prismaService.submission.count({
      where: {
        createdAt: {
          gte: body.dateRange?.startDate,
          lte: body.dateRange?.endDate,
        },
      },
    });

    return { count };
  }
  async getRecentlyDeletedSubmission(body: GetDashboardMetricsRequestDto) {
    const count = await this.prismaService.submission.count({
      where: {
        deletedAt: {
          not: null,
          gte: body.dateRange?.startDate,
          lte: body.dateRange?.endDate,
        },
      },
    });

    return { count };
  }
}
