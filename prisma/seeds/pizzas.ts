import type { Prisma } from '@prisma/client';

import { pizzaToppings } from './pizza-toppings';

interface PizzaBaseProps {
  name: string;
  description: string;
  imageUrl: string;
}

const createPizza = ({ name, description, imageUrl }: PizzaBaseProps) =>
  ({
    product: {
      create: {
        category: {
          connect: { code: 'PIZZA' },
        },
      },
    },
    name,
    imageUrl,
    description,
    availableBases: {
      create: ['THI', 'TRAD', 'PAN'].map(baseCode => ({
        baseCode,
        selected: baseCode === 'TRAD',
      })),
    },
    availableSizes: {
      create: ['MED', 'LAR', 'GIG'].map(size => ({
        sizeTypeCode: size,
        selected: size === 'MED',
      })),
    },
    toppings: {
      create: pizzaToppings.map(topping => ({
        toppingCode: topping.code,
        include: ['CRCH', 'ORE', 'PARM'].includes(topping.code),
        available: true,
      })),
    },
  } as Prisma.PizzaCreateInput);

export const pizzas: Prisma.PizzaCreateInput[] = [
  createPizza({
    name: '3 Queijos',
    imageUrl:
      'https://cache.dominos.com/olo/6_97_4/assets/build/market/BR/_pt/images/img/products/larges/S_PIZQU.jpg',
    description: 'Queijo, requeijão, oregano e parmesão ralado.',
  }),
  createPizza({
    name: 'Calabresa',
    imageUrl:
      'https://cache.dominos.com/olo/6_97_4/assets/build/market/BR/_pt/images/img/products/larges/S_PIZQU.jpg',
    description: 'Queijo, calabresa e cebola, oregano.',
  }),
  createPizza({
    name: 'Corn & Bacon',
    imageUrl:
      'https://cache.dominos.com/olo/6_97_4/assets/build/market/BR/_pt/images/img/products/larges/S_PIZQU.jpg',
    description: 'Queijo, bacon, oregano e milho.',
  }),
  createPizza({
    name: 'Cheese Pizza',
    imageUrl:
      'https://cache.dominos.com/olo/6_97_4/assets/build/market/BR/_pt/images/img/products/larges/S_PIZQU.jpg',
    description: 'Queijo e orégano.',
  }),
  createPizza({
    name: 'Margherita',
    imageUrl:
      'https://cache.dominos.com/olo/6_97_4/assets/build/market/BR/_pt/images/img/products/larges/S_PIZQU.jpg',
    description: 'Queijo, tomate, oregano e manjericão.',
  }),
  createPizza({
    name: 'Pepperoni',
    imageUrl:
      'https://cache.dominos.com/olo/6_97_4/assets/build/market/BR/_pt/images/img/products/larges/S_PIZQU.jpg',
    description: 'Queijo, oregano e pepperoni.',
  }),
];
