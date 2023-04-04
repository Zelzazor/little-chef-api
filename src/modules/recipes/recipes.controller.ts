import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Auth } from '../authz/auth.decorator';
import { Role } from '../authz/enums/role.enum';
import {
  FindRecipesBodyDto,
  FindRecipesQueryDto,
} from './dto/find-recipes.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @Auth(Role.Admin)
  create() {
    return true;
  }

  @Get()
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
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipesService.remove(id);
  }
}
