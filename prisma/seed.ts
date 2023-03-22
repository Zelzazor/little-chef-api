import { PrismaClient } from '@prisma/client';
import { ingredientsSeed } from './seeds/ingredient.seed';
import { recipesSeed } from './seeds/recipe.seed';
import { recipeIngredientsSeed } from './seeds/recipeIngredient.seed';
import { rolesSeed } from './seeds/role.seed';
import { submissionSeed } from './seeds/submission.seed';
import { submissionVoteSeed } from './seeds/submissionVote.seed';
import { Seed } from './seeds/types';
import { userSeed } from './seeds/user.seed';

const prisma = new PrismaClient();

const seeds: Seed[] = [
  rolesSeed,
  ingredientsSeed,
  recipesSeed,
  recipeIngredientsSeed,
  userSeed,
  submissionSeed,
  submissionVoteSeed,
];

const seed = async () => {
  const result = [];

  for (const seed of seeds) {
    try {
      const seedResult = [];

      for (const item of seed.data) {
        const itemResult = await (
          prisma[seed.entity as keyof typeof prisma] as any
        ).create({
          data: item,
        });
        seedResult.push(itemResult);
      }

      console.log(`[SEED] Created ${seed.entity} records`);
      result.push(seedResult);
    } catch (e) {
      console.error(`[SEED] Failed to create ${seed.entity} records`, e);
      result.push(null);
    }
  }

  return result;
};

seed()
  .then(async () => {
    console.log('[SEED] Seeding complete');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
