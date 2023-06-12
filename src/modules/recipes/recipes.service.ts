import { Injectable } from '@nestjs/common';
import { Recipe } from '@prisma/client';
import { PaginatedQueryResponseDto } from 'src/common/dto/paginated-query.response.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRecipeRequestDto } from './dto/create-recipe.dto';
import { FindRecipesDto } from './dto/find-recipes.dto';
import { UpdateRecipeRequestDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private prismaService: PrismaService) {}
  async create(recipe: CreateRecipeRequestDto & { imageUrl: string }) {
    const difficultyTags = await this.prismaService.tag.findMany({
      where: {
        tagType: {
          name: 'Difficulty',
        },
      },
    });
    const isDifficultyFoundOnTags = difficultyTags.some(
      (tag) => recipe.tags.indexOf(tag.id) > -1,
    );

    if (!isDifficultyFoundOnTags)
      recipe.tags = [
        ...recipe.tags,
        difficultyTags.find((tag) => tag.name === 'Medium')?.id ?? '',
      ];

    const createdRecipe = await this.prismaService.recipe.create({
      data: {
        name: recipe.name ?? '',
        imageUrl: recipe.imageUrl ?? '',
        recipeSteps: recipe.recipeSteps ?? '',
        tags: {
          create: recipe.tags.map((tag) => ({
            tag: {
              connect: {
                id: tag,
              },
            },
          })),
        },
        ingredients: {
          create: recipe.recipeIngredients.map((ingredient) => ({
            ingredient: {
              connect: {
                id: ingredient.ingredientId,
              },
            },
            quantity: ingredient.quantity,
            measure_unit: ingredient.measure_unit,
          })),
        },
      },
    });
    return { success: Boolean(createdRecipe) };
  }

  findMany({
    ingredients,
    name,
    tags,
    page,
    pageSize,
  }: FindRecipesDto): Promise<PaginatedQueryResponseDto<Array<Recipe>>> {
    const where = {
      ...(ingredients && ingredients.length > 0 && !name
        ? {
            ingredients: {
              every: {
                ingredientId: {
                  in: ingredients,
                },
              },
            },
          }
        : {}),
      ...(name
        ? {
            name: {
              contains: name,
              mode: 'insensitive' as const,
            },
          }
        : {}),
      ...(tags && tags.length > 0
        ? {
            tags: {
              some: {
                tagId: {
                  in: tags,
                },
              },
            },
          }
        : {}),
    };

    return this.prismaService.findManyPaginated(
      'recipe',
      {
        ...(where && { where }),
      },
      { page: page ?? 1, pageSize: pageSize ?? 10 },
    );
  }

  findOne(id: string) {
    return this.prismaService.recipe.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        createdAt: true,
        views: true,
        recipeSteps: true,
        ingredients: {
          select: {
            measure_unit: true,
            quantity: true,
            ingredient: true,
          },
        },
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });
  }

  update(id: string, updateRecipeDto: UpdateRecipeRequestDto) {
    return { id, ...updateRecipeDto };
  }

  remove(id: string) {
    return `This action removes a ${id} recipe`;
  }

  async countAll() {
    const count = await this.prismaService.recipe.count();
    return { count };
  }
}
