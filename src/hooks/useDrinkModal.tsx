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

export type DrinkType = Prisma.DrinkGetPayload<{
  select: {
    productId: true;
    name: true;
    imageUrl: true;
    product: {
      include: {
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
  const [drinkInfo, setDrinkInfo] = useState<DrinkInfo>({} as DrinkInfo);

  const [drinkId, setDrinkId] = useState<number>(-1);

  const { data } = trpc.drink.getById.useQuery(
    { id: drinkId },
    { enabled: drinkId !== -1 },
  );

  useEffect(() => {
    if (!data) {
      setDrinkInfo({} as DrinkInfo);
      return;
    }

    setDrinkInfo({ drink: data, amount: 1 });
  }, [data, setDrinkInfo]);

  const openModal: OpenModalHandles = useCallback(
    async productId => {
      setDrinkId(productId);
    },
    [setDrinkId],
  );

  const closeModal = useCallback(() => {
    setDrinkId(-1);
    setDrinkInfo({} as DrinkInfo);
  }, [setDrinkInfo, setDrinkId]);

  const addOneToAmount = useCallback(() => {
    setDrinkInfo(prev => ({ ...prev, amount: prev.amount + 1 }));
  }, [setDrinkInfo]);

  const subtractOneFromAmount = useCallback(() => {
    setDrinkInfo(prev => ({ ...prev, amount: prev.amount - 1 }));
  }, [setDrinkInfo]);

  const selectDrinkSize: SelectDrinkSizeHandles = useCallback(
    sizeName => {
      setDrinkInfo(prev => {
        const sizeFound = prev.drink.availableSizes.find(
          size => size.drinkSize.name === sizeName,
        );

        if (!sizeFound) {
          return prev;
        }

        const updatedSizes = [...prev.drink.availableSizes].map(size => ({
          ...size,
          selected: false,
        }));

        const sizeIndex = prev.drink.availableSizes.indexOf(sizeFound);

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
