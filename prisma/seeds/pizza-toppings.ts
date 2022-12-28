import type { Prisma } from '@prisma/client';

export const pizzaToppings: Prisma.ToppingTypeCreateInput[] = [
  {
    code: 'BL',
    name: 'Black Olives',
    price: 2,
  },
  {
    code: 'BAC',
    name: 'Bacon',
    price: 2,
  },
  {
    code: 'PEPP',
    name: 'Pepperoni',
    price: 2,
  },
  {
    code: 'ONI',
    name: 'Onion',
    price: 2,
  },
  {
    code: 'CHAMP',
    name: 'Champignons',
    price: 2,
  },
  {
    code: 'CRCH',
    name: 'Cream Cheese',
    price: 2,
  },
  {
    code: 'GRCH',
    name: 'Grilled Chicken',
    price: 2,
  },
  {
    code: 'GOR',
    name: 'Gorgonzola',
    price: 2,
  },
  {
    code: 'BAS',
    name: 'Basil',
    price: 2,
  },
  {
    code: 'COR',
    name: 'Corn',
    price: 2,
  },
  {
    code: 'ORE',
    name: 'Oregano',
    price: 2,
  },
  {
    code: 'QUE',
    name: 'Quail Egg',
    price: 2,
  },
  {
    code: 'PARM',
    name: 'Parmesan',
    price: 2,
  },
  {
    code: 'PPR',
    name: 'Pepper',
    price: 2,
  },
  {
    code: 'HAM',
    name: 'Ham',
    price: 2,
  },
  {
    code: 'TOM',
    name: 'Tomato',
    price: 2,
  },
  {
    code: 'SHCH',
    name: 'Shredded chicken',
    price: 2,
  },
];
