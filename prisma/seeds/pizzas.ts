import type { Prisma } from '@prisma/client';

import { pizzaToppings } from './pizza-toppings';

interface PizzaBaseProps {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const createPizza = ({ name, price, description, imageUrl }: PizzaBaseProps) =>
  ({
    product: {
      create: {
        name,
        price,
        imageUrl,
        category: {
          connect: { code: 'PIZZA' },
        },
      },
    },
    description,
    availableBases: {
      create: ['THI', 'TRAD', 'PAN'].map(baseCode => ({
        base: {
          connect: { code: baseCode },
        },
        selected: baseCode === 'TRAD',
      })),
    },
    availableSizes: {
      create: ['MED', 'LAR', 'GIG'].map(size => ({
        sizeType: {
          connect: { code: size },
        },
        selected: size === 'MED',
      })),
    },
    toppings: {
      create: pizzaToppings.map(topping => ({
        topping: {
          connect: {
            code: topping.code,
          },
        },
        include: ['CRCH', 'ORE', 'PARM'].includes(topping.code),
        available: true,
      })),
    },
  } as Prisma.PizzaCreateInput);

export const pizzas: Prisma.PizzaCreateInput[] = [
  createPizza({
    name: '3 Queijos',
    price: 30,
    imageUrl:
      'https://cache.dominos.com/olo/6_97_4/assets/build/market/BR/_pt/images/img/products/larges/S_PIZQU.jpg',
    description: 'Queijo, requeijão, oregano e parmesão ralado.',
  }),
  createPizza({
    name: 'Calabresa',
    price: 30,
    imageUrl:
      'https://cache.dominos.com/olo/6_97_4/assets/build/market/BR/_pt/images/img/products/larges/S_PIZQU.jpg',
    description: 'Queijo, calabresa e cebola, oregano.',
  }),
  createPizza({
    name: 'Corn & Bacon',
    price: 30,
    imageUrl:
      'https://cache.dominos.com/olo/6_97_4/assets/build/market/BR/_pt/images/img/products/larges/S_PIZQU.jpg',
    description: 'Queijo, bacon, oregano e milho.',
  }),
  createPizza({
    name: 'Cheese Pizza',
    price: 30,
    imageUrl:
      'https://cache.dominos.com/olo/6_97_4/assets/build/market/BR/_pt/images/img/products/larges/S_PIZQU.jpg',
    description: 'Queijo e orégano.',
  }),
  createPizza({
    name: 'Margherita',
    price: 30,
    imageUrl:
      'https://cache.dominos.com/olo/6_97_4/assets/build/market/BR/_pt/images/img/products/larges/S_PIZQU.jpg',
    description: 'Queijo, tomate, oregano e manjericão.',
  }),
  createPizza({
    name: 'Pepperoni',
    price: 30,
    imageUrl:
      'https://cache.dominos.com/olo/6_97_4/assets/build/market/BR/_pt/images/img/products/larges/S_PIZQU.jpg',
    description: 'Queijo, oregano e pepperoni.',
  }),
];
