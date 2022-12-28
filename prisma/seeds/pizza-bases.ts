import type { Prisma } from '@prisma/client';

export const pizzaBases: Prisma.PizzaBaseTypeCreateInput[] = [
  {
    code: 'THI',
    name: 'Thin',
    price: 10,
  },
  {
    code: 'TRAD',
    name: 'Traditional',
    price: 15,
  },
  {
    code: 'PAN',
    name: 'Pan',
    price: 20,
  },
];
