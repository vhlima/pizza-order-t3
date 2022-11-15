import type { Prisma } from '@prisma/client';

export const pizzaToppings: Prisma.ToppingTypeCreateInput[] = [
  {
    code: 'BL',
    name: 'Black Olives',
  },
  {
    code: 'BAC',
    name: 'Bacon',
  },
  {
    code: 'PEPP',
    name: 'Pepperoni',
  },
  {
    code: 'ONI',
    name: 'Onion',
  },
  {
    code: 'CHAMP',
    name: 'Champignons',
  },
  {
    code: 'CRCH',
    name: 'Cream Cheese',
  },
  {
    code: 'GRCH',
    name: 'Grilled Chicken',
  },
  {
    code: 'GOR',
    name: 'Gorgonzola',
  },
  {
    code: 'BAS',
    name: 'Basil',
  },
  {
    code: 'COR',
    name: 'Corn',
  },
  {
    code: 'ORE',
    name: 'Oregano',
  },
  {
    code: 'QUE',
    name: 'Quail Egg',
  },
  {
    code: 'PARM',
    name: 'Parmesan',
  },
  {
    code: 'PPR',
    name: 'Pepper',
  },
  {
    code: 'HAM',
    name: 'Ham',
  },
  {
    code: 'TOM',
    name: 'Tomato',
  },
  {
    code: 'SHCH',
    name: 'Shredded chicken',
  },
];
