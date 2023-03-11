import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { FindRecipeDto } from './dto/find-recipes.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private prismaService: PrismaService) {}
  create(createRecipeDto: CreateRecipeDto) {
    return createRecipeDto;
  }

  findAll({ ingredients, name, limit, skip, tags }: FindRecipeDto) {
    const where = {
      ...(ingredients && ingredients.length > 0 && !name
        ? {
            ingredients: {
              some: {
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

    return this.prismaService.recipe.findMany({
      ...(where && { where }),
      take: limit || 10,
      skip: skip || 0,
    });
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

  update(id: string, updateRecipeDto: UpdateRecipeDto) {
    return { id, ...updateRecipeDto };
  }

  remove(id: string) {
    return `This action removes a ${id} recipe`;
  }
}
