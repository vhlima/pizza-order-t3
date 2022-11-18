import type { Prisma } from '@prisma/client';

interface SideDishBaseProps {
  name: string;
  description: string;
  imageUrl: string;
}

const createSideDish = ({ name, description, imageUrl }: SideDishBaseProps) =>
  ({
    product: {
      create: {
        name,
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
    description:
      'Queijo, calabresa, cebola, parmesão ralado, requeijão e azeite.',
    imageUrl:
      'https://cache.dominos.com/olo/6_98_8/assets/build/market/BR/_pt/images/img/products/larges/F_CBCALA.jpg',
  }),
  createSideDish({
    name: 'Cheesebread Margherita',
    description:
      'Queijo, calabresa, cebola, parmesão ralado, requeijão e azeite.',
    imageUrl:
      'https://cache.dominos.com/olo/6_98_8/assets/build/market/BR/_pt/images/img/products/larges/F_CBCALA.jpg',
  }),
  createSideDish({
    name: 'Cheesebread 4 Queijos',
    description:
      'Queijo, calabresa, cebola, parmesão ralado, requeijão e azeite.',
    imageUrl:
      'https://cache.dominos.com/olo/6_98_8/assets/build/market/BR/_pt/images/img/products/larges/F_CBCALA.jpg',
  }),
  createSideDish({
    name: 'Alho Roll',
    description:
      'Queijo, calabresa, cebola, parmesão ralado, requeijão e azeite.',
    imageUrl:
      'https://cache.dominos.com/olo/6_98_8/assets/build/market/BR/_pt/images/img/products/larges/F_CBCALA.jpg',
  }),
];
