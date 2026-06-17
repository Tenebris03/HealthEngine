import { config } from 'dotenv';
import { resolve } from 'path';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

config({ path: resolve(process.cwd(), '../.env') });
config({ path: resolve(process.cwd(), '.env') });

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env['DATABASE_URL'] });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const users = [
  { name: 'Issei Hyoudou', points: 9850 },
  { name: 'Rias Gremory', points: 9200 },
  { name: 'Akeno Himejima', points: 8750 },
  { name: 'Koneko Toujou', points: 8100 },
  { name: 'Xenovia Quarta', points: 7650 },
  { name: 'Asia Argento', points: 7200 },
  { name: 'Kiba Yuuto', points: 6800 },
  { name: 'Irina Shidou', points: 6400 },
  { name: 'Rossweisse', points: 5900 },
  { name: 'Freed Sellzen', points: 5300 },
  { name: 'Sona Sitri', points: 4800 },
  { name: 'Tsubaki Shinra', points: 4200 },
];

async function main() {
  console.log('Seeding leaderboard users...');

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: `${u.name.toLowerCase().replace(/\s+/g, '.')}@dxd.test` },
      update: { points: u.points },
      create: {
        email: `${u.name.toLowerCase().replace(/\s+/g, '.')}@dxd.test`,
        name: u.name,
        provider: 'seed',
        providerId: `seed-${u.name}`,
        passwordHash: null,
        points: u.points,
      },
    });
  }

  console.log(`Seeded ${users.length} users.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
