import type { Prisma } from '@prisma/client';

interface SideDishBaseProps {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const createSideDish = ({
  name,
  description,
  price,
  imageUrl,
}: SideDishBaseProps) =>
  ({
    product: {
      create: {
        name,
        price,
        imageUrl,
        category: {
          connect: {
            code: 'SIDEDISH',
          },
        },
      },
    },
    description,
  } as Prisma.SideDishCreateInput);

export const sideDishes: Prisma.SideDishCreateInput[] = [
  createSideDish({
    name: 'Cheesebread Calabresa',
    price: 10,
    description:
      'Queijo, calabresa, cebola, parmesão ralado, requeijão e azeite.',
    imageUrl:
      'https://cache.dominos.com/olo/6_98_8/assets/build/market/BR/_pt/images/img/products/larges/F_CBCALA.jpg',
  }),
  createSideDish({
    name: 'Cheesebread Margherita',
    price: 10,
    description:
      'Queijo, calabresa, cebola, parmesão ralado, requeijão e azeite.',
    imageUrl:
      'https://cache.dominos.com/olo/6_98_8/assets/build/market/BR/_pt/images/img/products/larges/F_CBCALA.jpg',
  }),
  createSideDish({
    name: 'Cheesebread 4 Queijos',
    price: 10,
    description:
      'Queijo, calabresa, cebola, parmesão ralado, requeijão e azeite.',
    imageUrl:
      'https://cache.dominos.com/olo/6_98_8/assets/build/market/BR/_pt/images/img/products/larges/F_CBCALA.jpg',
  }),
  createSideDish({
    name: 'Alho Roll',
    price: 10,
    description:
      'Queijo, calabresa, cebola, parmesão ralado, requeijão e azeite.',
    imageUrl:
      'https://cache.dominos.com/olo/6_98_8/assets/build/market/BR/_pt/images/img/products/larges/F_CBCALA.jpg',
  }),
];
