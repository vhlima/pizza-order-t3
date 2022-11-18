import type { Prisma } from '@prisma/client';

import type { PizzaType } from '../hooks/usePizzaBuilder';

export type ShoppingCartItemInfo<T extends { product: { id: number } }> = {
  item: T;
  amount: number;
};

export type DrinkType = Prisma.DrinkGetPayload<{
  select: {
    product: {
      select: {
        id: true;
        name: true;
        imageUrl: true;
        category: {
          select: {
            code: true;
          };
        };
      };
    };
    availableSizes: {
      select: {
        selected: true;
        sizeType: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;

export type SideDishType = Prisma.SideDishGetPayload<{
  select: {
    description: true;
    product: {
      select: {
        id: true;
        name: true;
        imageUrl: true;
        category: {
          select: {
            code: true;
          };
        };
      };
    };
  };
}>;

// export type ShoppingCartItemTypes = PizzaType | DrinkType | SideDishType;

export type ShoppingCartItem =
  | ShoppingCartItemInfo<PizzaType>
  | ShoppingCartItemInfo<DrinkType>
  | ShoppingCartItemInfo<SideDishType>;

export type ShoppingCartProducts = Array<ShoppingCartItem>;
