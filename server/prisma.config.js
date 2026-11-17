// Prisma 8 configuration with version marker
import { definePrismaConfig } from '@prisma/cli-engine';
import { defineAdapter } from '@prisma/adapter-node';
import { defineFamily } from '@prisma/family-postgresql';

export default definePrismaConfig({
  orm: {
    adapter: defineAdapter(),
    family: defineFamily(),
    target: './prisma/schema.prisma',
  },
});

