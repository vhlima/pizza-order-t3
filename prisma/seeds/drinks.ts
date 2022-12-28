import type { Prisma } from '@prisma/client';

interface DrinkBaseProps {
  name: string;
  price: number;
  imageUrl: string;
  simpleSizes?: boolean;
}

const createDrink = ({ name, price, imageUrl, simpleSizes }: DrinkBaseProps) =>
  ({
    product: {
      create: {
        name,
        price,
        imageUrl,
        category: {
          connect: {
            code: 'DRINK',
          },
        },
      },
    },
    availableSizes: {
      create: (simpleSizes
        ? ['Can of Dell Valle']
        : ['Can', '600ML', '2L']
      ).map((size, index) => ({
        selected: size === '2L',
        sizeType: {
          create: {
            name: size,
            price: (index + 1) * 3,
          },
        },
      })),
    },
  } as Prisma.DrinkCreateInput);

export const drinks: Prisma.DrinkCreateInput[] = [
  createDrink({
    name: 'Coca-Cola',
    price: 8,
    imageUrl:
      'https://cache.dominos.com/olo/6_98_8/assets/build/market/BR/_pt/images/img/products/larges/F_COKE.jpg',
  }),
  createDrink({
    name: 'Coca-Cola Zero',
    price: 8,
    imageUrl:
      'https://cache.dominos.com/wam/prod/market/BR/_pt/images/promo/c871dfed-0fa7-4026-92c3-260de2d6ba60.jpg',
  }),
  createDrink({
    simpleSizes: true,
    name: 'Del Valle Grape',
    price: 5,
    imageUrl:
      'https://cache.dominos.com/olo/6_98_8/assets/build/market/BR/_pt/images/img/products/larges/F_VJGRAPE.jpg',
  }),
  createDrink({
    simpleSizes: true,
    name: 'Del Valle Peach',
    price: 5,
    imageUrl:
      'https://cache.dominos.com/olo/6_98_8/assets/build/market/BR/_pt/images/img/products/larges/F_VJPASION.jpg',
  }),
];
