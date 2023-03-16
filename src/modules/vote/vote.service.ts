import { Injectable } from '@nestjs/common';
import { Recipe } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecipesService } from '../recipes/recipes.service';
import { VoteSubmissionDto } from './dto/vote-submission.dto';

@Injectable()
export class VoteService {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly prismaService: PrismaService,
  ) {}

  async getRandomSubmission(userId: string): Promise<Recipe> {
    const recipes = await this.recipesService.findAll({});

    const votedRecipeIds = (
      await this.prismaService.submissionVote.findMany({
        where: { user_id: userId },
        select: { submission_id: true },
      })
    ).map((vote) => vote.submission_id);

    const unvotedRecipes = recipes.filter(
      (recipe) => !votedRecipeIds.includes(recipe.id),
    );

    const randomIndex = Math.floor(Math.random() * unvotedRecipes.length);

    return unvotedRecipes[randomIndex];
  }

  async voteSubmission(voteRecipeDto: VoteSubmissionDto): Promise<Recipe> {}
}
