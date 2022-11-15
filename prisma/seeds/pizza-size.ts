import type { Prisma } from '@prisma/client';

export const pizzaSizeTypes: Prisma.PizzaSizeTypeCreateInput[] = [
  {
    code: 'SPR',
    name: 'Sprout',
    size: 18,
  },
  {
    code: 'MED',
    name: 'Medium',
    size: 30,
  },
  {
    code: 'LAR',
    name: 'Large',
    size: 35,
  },
  {
    code: 'GIG',
    name: 'Giga',
    size: 40,
  },
];
