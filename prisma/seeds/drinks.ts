import type { Prisma } from '@prisma/client';

interface DrinkBaseProps {
  name: string;
  imageUrl: string;
  simpleSizes?: boolean;
}

const createDrink = ({ name, imageUrl, simpleSizes }: DrinkBaseProps) =>
  ({
    product: {
      create: {
        name,
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
        : ['2L', '600ML', 'Can']
      ).map(size => ({
        selected: size === '2L',
        sizeType: {
          create: {
            name: size,
          },
        },
      })),
    },
  } as Prisma.DrinkCreateInput);

export const drinks: Prisma.DrinkCreateInput[] = [
  createDrink({
    name: 'Coca-Cola',
    imageUrl:
      'https://cache.dominos.com/olo/6_98_8/assets/build/market/BR/_pt/images/img/products/larges/F_COKE.jpg',
  }),
  createDrink({
    name: 'Coca-Cola Zero',
    imageUrl:
      'https://cache.dominos.com/wam/prod/market/BR/_pt/images/promo/c871dfed-0fa7-4026-92c3-260de2d6ba60.jpg',
  }),
  createDrink({
    simpleSizes: true,
    name: 'Del Valle Grape',
    imageUrl:
      'https://cache.dominos.com/olo/6_98_8/assets/build/market/BR/_pt/images/img/products/larges/F_VJGRAPE.jpg',
  }),
  createDrink({
    simpleSizes: true,
    name: 'Del Valle Peach',
    imageUrl:
      'https://cache.dominos.com/olo/6_98_8/assets/build/market/BR/_pt/images/img/products/larges/F_VJPASION.jpg',
  }),
];
