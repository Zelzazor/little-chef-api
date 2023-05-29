import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AmazonS3FileInterceptor } from 'nestjs-multer-extended';
import { Auth } from '../authz/auth.decorator';
import { Role } from '../authz/enums/role.enum';
import { ParseDataInterceptor } from '../s3-upload/data.interceptor';
import {
  CreateRecipeRequestDto,
  CreateRecipeResponseDto,
} from './dto/create-recipe.dto';
import {
  FindRecipesBodyDto,
  FindRecipesQueryDto,
} from './dto/find-recipes.dto';
import { UpdateRecipeRequestDto } from './dto/update-recipe.dto';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post('/create')
  @Auth(Role.Admin)
  @UseInterceptors(
    AmazonS3FileInterceptor('file', { randomFilename: true }),
    ParseDataInterceptor,
  )
  async create(
    @UploadedFile() file: Express.Multer.File & { Location: string },
    @Body() body: CreateRecipeRequestDto,
  ): Promise<CreateRecipeResponseDto> {
    return this.recipesService.create({
      imageUrl: file.Location,
      ...body,
    });
  }

  @Post()
  @HttpCode(200)
  findMany(
    @Query() { name, page, pageSize }: FindRecipesQueryDto,
    @Body() { ingredients, tags }: FindRecipesBodyDto,
  ) {
    return this.recipesService.findMany({
      name,
      ingredients,
      tags,
      page,
      pageSize,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeRequestDto,
  ) {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipesService.remove(id);
  }
}
