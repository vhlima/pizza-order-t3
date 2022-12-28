import type { Prisma } from '@prisma/client';

const createPizzaSize = (
  code: string,
  name: string,
  cm: number,
  price: number,
): Prisma.PizzaSizeTypeCreateInput => ({
  code,
  name,
  price,
  size: cm,
});

export const pizzaSizeTypes = [
  createPizzaSize('SPR', 'Sprout', 18, 20),
  createPizzaSize('MED', 'Medium', 30, 30),
  createPizzaSize('LAR', 'Large', 35, 40),
  createPizzaSize('GIG', 'Giga', 40, 50),
];
