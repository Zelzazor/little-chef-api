import { Controller, Get } from '@nestjs/common';
import {
  Body,
  Delete,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { Request } from 'express';
import { AmazonS3FileInterceptor } from 'nestjs-multer-extended';
import { BasePaginationQueryDto } from '../../common/dto/base-pagination.query.dto';
import { PaginatedQueryResponseDto } from '../../common/dto/paginated-query.response.dto';
import { Auth } from '../authz/auth.decorator';
import { Role } from '../authz/enums/role.enum';
import { ParseDataInterceptor } from '../s3-upload/data.interceptor';
import { UpdateUserResponseDto } from '../user/dto/update-user.response.dto';
import { CreateSubmissionRequestDto } from './dto/create-submission.request.dto';
import { CreateSubmissionResponseDto } from './dto/create-submission.response.dto';
import { DeleteSubmissionResponseDto } from './dto/delete-submission.response.dto';
import { GetOwnSubmissionsRequestDto } from './dto/get-own-submissions.request.dto';
import { GetSubmissionsRequestDto } from './dto/get-submissions.request.dto';
import { GetSubmissionsResponseDto } from './dto/get-submissions.response.dto';
import { UpdateSubmissionRequestDto } from './dto/update-submission.request.dto';
import { SubmissionService } from './submission.service';

@Controller('submission')
export class SubmissionController {
  constructor(private submissionService: SubmissionService) {}

  @Get()
  @Auth(Role.Admin)
  async getSubmissions(
    @Query() query: BasePaginationQueryDto,
    @Body() body: GetSubmissionsRequestDto,
  ): Promise<PaginatedQueryResponseDto<GetSubmissionsResponseDto>> {
    return await this.submissionService.getSubmissions({ ...query, ...body });
  }

  @Post('user')
  @Auth()
  @HttpCode(200)
  async getOwnSubmissions(
    @Query() query: BasePaginationQueryDto,
    @Body() body: GetOwnSubmissionsRequestDto,
    @Req() req: Request,
  ): Promise<PaginatedQueryResponseDto<GetSubmissionsResponseDto>> {
    return await this.submissionService.getSubmissions({
      ...query,
      userId: req.user?.id,
      ...body,
    });
  }

  @Post()
  @Auth()
  @UseInterceptors(
    AmazonS3FileInterceptor('file', { randomFilename: true }),
    ParseDataInterceptor,
  )
  async createSubmission(
    @UploadedFile() file: Express.Multer.File & { Location: string },
    @Body() body: CreateSubmissionRequestDto,
    @Req() req: Request,
  ): Promise<CreateSubmissionResponseDto> {
    return await this.submissionService.createSubmission({
      userId: req.user?.id,
      imageUrl: file.Location,
      recipeId: body.recipeId,
    });
  }

  @Patch(':id')
  @Auth(Role.Admin)
  async updateSubmission(
    @Param('id') id: string,
    @Body() body: UpdateSubmissionRequestDto,
  ): Promise<UpdateUserResponseDto> {
    return await this.submissionService.updateSubmission(id, body);
  }

  @Delete(':id')
  @Auth(Role.Admin)
  async deleteSubmission(
    @Param('id') id: string,
  ): Promise<DeleteSubmissionResponseDto> {
    return await this.submissionService.deleteSubmission(id);
  }
}
