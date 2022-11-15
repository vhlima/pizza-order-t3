import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

import type { PropsWithChildren } from 'react';

import type { PizzaType } from './usePizzaBuilderModal';

type ShoppingCartPizzaInfo = {
  pizza: PizzaType;
  amount: number;
};

type AddPizzaToCardHandles = (pizza: PizzaType) => void;

type ChangeProductAmountHandles = (productId: number, amount: number) => void;

type RemovePizzaFromCartHandles = (productId: number) => void;

interface ShoppingCartContextHandles {
  pizzas: ShoppingCartPizzaInfo[];

  addPizzaToCart: AddPizzaToCardHandles;
  removePizzaFromCart: RemovePizzaFromCartHandles;

  changeProductAmount: ChangeProductAmountHandles;
}

const ShoppingCartContext = createContext({} as ShoppingCartContextHandles);

export const ShoppingCartProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [pizzas, setPizzas] = useState<ShoppingCartPizzaInfo[]>([]);

  const addPizzaToCart: AddPizzaToCardHandles = useCallback(
    pizza => {
      setPizzas(prev => {
        const pizzaFound = prev.find(
          pizzaInfo => pizzaInfo.pizza.productId === pizza.productId,
        );

        if (!pizzaFound) {
          return [...prev, { pizza, amount: 1 }];
        }

        const pizzaIndex = prev.indexOf(pizzaFound);

        const updatedPizzas = [...prev];

        updatedPizzas[pizzaIndex] = {
          ...pizzaFound,
          pizza: {
            ...pizzaFound.pizza,
            ...pizza,
          },
        };

        return updatedPizzas;
      });
    },
    [setPizzas],
  );

  const removePizzaFromCart: RemovePizzaFromCartHandles = useCallback(
    productId => {
      setPizzas(prev =>
        prev.filter(productInfo => productInfo.pizza.productId !== productId),
      );
    },
    [setPizzas],
  );

  const changeProductAmount: ChangeProductAmountHandles = useCallback(
    (productId, amount) => {
      setPizzas(prev => {
        const cartProductIndex = prev.findIndex(
          p => p.pizza.productId === productId,
        );

        if (cartProductIndex < 0) {
          return prev;
        }

        const prevCopy = [...prev];

        const cartProduct = prevCopy[cartProductIndex];

        if (!cartProduct) {
          return prev;
        }

        prevCopy[cartProductIndex] = {
          pizza: cartProduct.pizza,
          amount,
        };

        return prevCopy;
      });
    },
    [setPizzas],
  );

  const contextValue = useMemo(
    () => ({
      pizzas,
      addPizzaToCart,
      removePizzaFromCart,
      changeProductAmount,
    }),
    [pizzas, addPizzaToCart, removePizzaFromCart, changeProductAmount],
  );

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export function useShoppingCart(): ShoppingCartContextHandles {
  const context = useContext(ShoppingCartContext);

  if (!context) {
    throw new Error('useShoppingCart must be used within an provider');
  }

  return context;
}
