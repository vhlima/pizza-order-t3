import type { Prisma } from '@prisma/client';

const createPizzaSize = (
  code: string,
  name: string,
  cm: number,
): Prisma.PizzaSizeTypeCreateInput => ({
  code,
  name,
  size: cm,
});

export const pizzaSizeTypes = [
  createPizzaSize('SPR', 'Sprout', 18),
  createPizzaSize('MED', 'Medium', 30),
  createPizzaSize('LAR', 'Large', 35),
  createPizzaSize('GIG', 'Giga', 40),
];
