import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

import type { PropsWithChildren, Dispatch, SetStateAction } from 'react';

import type { Prisma } from '@prisma/client';

export type PizzaType = Prisma.PizzaGetPayload<{
  include: {
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
    availableBases: {
      orderBy: {
        base: {
          name: 'desc';
        };
      };
      select: {
        selected: true;
        base: {
          select: {
            code: true;
            name: true;
          };
        };
      };
    };
    toppings: {
      select: {
        include: true;
        available: true;
        topping: {
          select: {
            code: true;
            name: true;
          };
        };
      };
    };
    availableSizes: {
      select: {
        selected: true;
        sizeType: {
          select: {
            code: true;
            name: true;
            size: true;
          };
        };
      };
    };
  };
}>;

type OpenModalHandles = (pizza: PizzaType) => void;

interface PizzaBuilderContextHandles {
  pizza: PizzaType;
  setPizza: Dispatch<SetStateAction<PizzaType>>;

  isModalOpen: boolean;

  openModal: OpenModalHandles;
  closeModal: () => void;
}

export const PizzaBuilderContext = createContext(
  {} as PizzaBuilderContextHandles,
);

export const PizzaBuilderProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [pizza, setPizza] = useState<PizzaType>({} as PizzaType);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const openModal: OpenModalHandles = useCallback(
    pizzaBase => {
      setPizza(pizzaBase);
      setModalOpen(true);
    },
    [setPizza, setModalOpen],
  );

  const closeModal = useCallback(() => {
    setPizza({} as PizzaType);
    setModalOpen(false);
  }, []);

  const contextValue = useMemo(
    () => ({ pizza, setPizza, isModalOpen, openModal, closeModal }),
    [pizza, setPizza, isModalOpen, openModal, closeModal],
  );

  return (
    <PizzaBuilderContext.Provider value={contextValue}>
      {children}
    </PizzaBuilderContext.Provider>
  );
};

export function usePizzaBuilder(): PizzaBuilderContextHandles {
  const context = useContext(PizzaBuilderContext);

  if (!context) {
    throw new Error('usePizzaBuilder must be used within an provider');
  }

  return context;
}
