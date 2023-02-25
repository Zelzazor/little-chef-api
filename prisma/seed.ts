import { PrismaClient } from '@prisma/client';
import { rolesSeed } from './seeds/role.seed';
import { Seed } from './seeds/types';

const prisma = new PrismaClient();

const seeds: Seed[] = [rolesSeed];

function seed() {
  seeds.map((seed) => {
    Promise.all(
      seed.data.map((item) =>
        (prisma[seed.entity as keyof typeof prisma] as any).create({
          data: item,
        }),
      ),
    )
      .then(() =>
        console.info(`[SEED] Successfully created ${seed.entity} records`),
      )
      .catch((e) =>
        console.error(`[SEED] Failed to create ${seed.entity} records`, e),
      );
  });
}

seed();
