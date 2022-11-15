import type { Prisma } from '@prisma/client';

export const productCategories: Prisma.ProductCategoryCreateInput[] = [
  {
    code: 'PIZZA',
    name: 'Pizza flavours',
    imageUrl:
      'https://cache.dominos.com/olo/6_96_8/assets/build/market/BR/_pt/images/img/entree-page/gridLayout/specialty.png',
  },
  {
    code: 'SANDWICH',
    name: 'Sandwiches',
    imageUrl:
      'https://cache.dominos.com/olo/6_96_8/assets/build/market/BR/_pt/images/img/entree-page/gridLayout/sandwiches.png',
  },
  {
    code: 'SIDEDISH',
    name: 'Side dishes',
    imageUrl:
      'https://cache.dominos.com/olo/6_96_8/assets/build/market/BR/_pt/images/img/entree-page/gridLayout/sides.png',
  },
  {
    code: 'DESSERT',
    name: 'Desserts',
    imageUrl:
      'https://cache.dominos.com/olo/6_96_8/assets/build/market/BR/_pt/images/img/entree-page/gridLayout/dessert.png',
  },
  {
    code: 'DRINK',
    name: 'Drinks',
    imageUrl:
      'https://cache.dominos.com/olo/6_96_8/assets/build/market/BR/_pt/images/img/entree-page/gridLayout/drinks.png',
  },
];
