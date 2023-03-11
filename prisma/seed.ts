import { PrismaClient } from '@prisma/client';
import { rolesSeed } from './seeds/role.seed';
import { Seed } from './seeds/types';

const prisma = new PrismaClient();

const seeds: Seed[] = [rolesSeed];

async function seed() {
  const result = Promise.all(
    seeds.map(async (seed) => {
      try {
        const seedResult = await Promise.all(
          seed.data.map(async (item) => {
            const itemResult = (
              prisma[seed.entity as keyof typeof prisma] as any
            ).create({
              data: item,
            });
            return itemResult;
          }),
        );
        console.log(`[SEED] Created ${seed.entity} records`);
        return seedResult;
      } catch (e) {
        console.error(`[SEED] Failed to create ${seed.entity} records`, e);
        return null;
      }
    }),
  );

  return result;
}

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
