import { Injectable } from '@nestjs/common';
import { Submission } from '@prisma/client';
import { PaginatedQueryResponseDto } from '../../common/dto/paginated-query.response.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSubmissionRequestDto } from './dto/create-submission.request.dto';
import { CreateSubmissionResponseDto } from './dto/create-submission.response.dto';
import { DeleteSubmissionResponseDto } from './dto/delete-submission.response.dto';
import { GetSubmissionsResponseDto } from './dto/get-submissions.response.dto';
import { UpdateSubmissionRequestDto } from './dto/update-submission.request.dto';
import { UpdateSubmissionResponseDto } from './dto/update-submission.response.dto';
import { GetSubmissionFilters } from './types/get-submission-filters';

@Injectable()
export class SubmissionService {
  constructor(private prismaService: PrismaService) {}

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
      },
      { page: filters.page, pageSize: filters.pageSize },
    );
  }

  async createSubmission(
    submission: CreateSubmissionRequestDto,
  ): Promise<CreateSubmissionResponseDto> {
    const createdSubmission = await this.prismaService.submission.create({
      data: {
        ...(submission as Submission),
        imageUrl: '', //Temporary until we implement image upload.
      },
    });

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
}
