import type { Prisma } from '@prisma/client';

export const pizzaBases: Prisma.PizzaBaseTypeCreateInput[] = [
  {
    code: 'THI',
    name: 'Thin',
  },
  {
    code: 'TRAD',
    name: 'Traditional',
  },
  {
    code: 'PAN',
    name: 'Pan',
  },
];
