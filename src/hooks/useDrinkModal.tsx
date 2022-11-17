import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import type { PropsWithChildren, Dispatch, SetStateAction } from 'react';

import type { Prisma } from '@prisma/client';

import { trpc } from '../utils/trpc';

import { useShoppingCart } from './useShoppingCart';

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
        drinkSize: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;

type OpenModalHandles = (drinkId: number) => void;

type SelectDrinkSizeHandles = (sizeName: string) => void;

interface DrinkInfo {
  drink: DrinkType;
  amount: number;
}

interface DrinkContextHandles {
  drinkInfo: DrinkInfo;
  setDrinkInfo: Dispatch<SetStateAction<DrinkInfo>>;

  selectDrinkSize: SelectDrinkSizeHandles;

  openModal: OpenModalHandles;
  closeModal: () => void;

  addOneToAmount: () => void;
  subtractOneFromAmount: () => void;
}

export const DrinkContext = createContext({} as DrinkContextHandles);

export const DrinkProvider: React.FC<PropsWithChildren> = ({ children }) => {
  /*
    This can be just drink returned from database query with default props
    or it can be directly from user's cart cache.
  */
  const [drinkInfo, setDrinkInfo] = useState<DrinkInfo>({} as DrinkInfo);

  /* 
    This state is needed to trigger drink.getById query
    when lazy querying with trpc.
  */
  const [drinkId, setDrinkId] = useState<number>(-1);

  const { products } = useShoppingCart();

  /* Only trigger this query when drinkId is a valid value */
  const { data } = trpc.drink.getById.useQuery(
    { id: drinkId },
    { enabled: drinkId !== -1 },
  );

  /* 
    Everytime trpc execute drink.getById query we have to
    update drinkInfo state with the most recent data.
  */
  useEffect(() => {
    if (!data) {
      /* If we dont have any data from response we set it empty. */
      setDrinkInfo({} as DrinkInfo);
      return;
    }

    /* Update drinkInfo state with database data. */
    setDrinkInfo({ drink: data, amount: 1 });
  }, [data, setDrinkInfo]);

  const openModal: OpenModalHandles = useCallback(
    async productId => {
      /* Try to find product from user's cart. */
      const productExists = products.find(
        ({ item }) => item.product.id === productId,
      );

      /* If the product its not present in user's cart we have to fetch it. */
      if (!productExists) {
        /* Setting drinkId will trigger drink.getById query. */
        setDrinkId(productId);
        return;
      }

      /* 
        If we already have the product in user's cart we
        just pass its props to drinkInfo. 
      */
      setDrinkInfo({
        amount: productExists.amount,
        drink: productExists.item,
      } as DrinkInfo);
    },
    [products, setDrinkId],
  );

  const closeModal = useCallback(() => {
    /* Reset drinkId */
    setDrinkId(-1);

    /* Reset drinkInfo */
    setDrinkInfo({} as DrinkInfo);
  }, [setDrinkInfo, setDrinkId]);

  const addOneToAmount = useCallback(() => {
    /* Sum 1 in previous amount of drinkInfo */
    setDrinkInfo(prev => ({ ...prev, amount: prev.amount + 1 }));
  }, [setDrinkInfo]);

  const subtractOneFromAmount = useCallback(() => {
    /* Subtract 1 from previous amount of drinkInfo */
    setDrinkInfo(prev => ({ ...prev, amount: prev.amount - 1 }));
  }, [setDrinkInfo]);

  const selectDrinkSize: SelectDrinkSizeHandles = useCallback(
    sizeName => {
      setDrinkInfo(prev => {
        /* Check if sizeName is a valid size. */
        const sizeFound = prev.drink.availableSizes.find(
          size => size.drinkSize.name === sizeName,
        );

        /* If it's not a valid size we don't modify the state. */
        if (!sizeFound) {
          return prev;
        }

        /* Ensure all sizes have selected marked as false */
        const updatedSizes = [...prev.drink.availableSizes].map(size => ({
          ...size,
          selected: false,
        }));

        const sizeIndex = prev.drink.availableSizes.indexOf(sizeFound);

        /* Update size with selected prop */
        updatedSizes[sizeIndex] = {
          ...sizeFound,
          selected: true,
        };

        return {
          ...prev,
          drink: {
            ...prev.drink,
            availableSizes: updatedSizes,
          },
        };
      });
    },
    [setDrinkInfo],
  );

  const contextValue = useMemo(
    () => ({
      drinkInfo,
      setDrinkInfo,
      selectDrinkSize,
      addOneToAmount,
      subtractOneFromAmount,
      openModal,
      closeModal,
    }),
    [
      drinkInfo,
      setDrinkInfo,
      selectDrinkSize,
      openModal,
      closeModal,
      addOneToAmount,
      subtractOneFromAmount,
    ],
  );

  return (
    <DrinkContext.Provider value={contextValue}>
      {children}
    </DrinkContext.Provider>
  );
};

export function useDrinkModal(): DrinkContextHandles {
  const context = useContext(DrinkContext);

  if (!context) {
    throw new Error('useDrinkModal must be used within an provider');
  }

  return context;
}
