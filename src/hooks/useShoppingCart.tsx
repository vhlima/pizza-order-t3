import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

import type { PropsWithChildren } from 'react';

import type { PizzaType } from './usePizzaBuilder';

import type { DrinkType } from './useDrinkModal';

export type ShoppingCartProductInfo<T extends { productId: number }> = {
  product: T;
  amount: number;
};

type ShoppingCartProductType =
  | ShoppingCartProductInfo<PizzaType>
  | ShoppingCartProductInfo<DrinkType>;

type ShoppingCartProducts = Array<ShoppingCartProductType>;

type AddProductToCartHandles = (
  product: Omit<ShoppingCartProductType, 'amount'> & { amount?: number },
) => void;

type ChangeProductAmountHandles = (productId: number, amount: number) => void;

type RemoveProductFromCartHandles = (productId: number) => void;

interface ShoppingCartContextHandles {
  products: ShoppingCartProducts;

  addProductToCart: AddProductToCartHandles;
  removeProductFromCart: RemoveProductFromCartHandles;
  changeProductAmount: ChangeProductAmountHandles;
}

const ShoppingCartContext = createContext({} as ShoppingCartContextHandles);

export const ShoppingCartProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [products, setProducts] = useState<ShoppingCartProducts>([]);

  const addProductToCart: AddProductToCartHandles = useCallback(
    ({ product, amount }) => {
      setProducts(prev => {
        const productFound = prev.find(
          productInfo => productInfo.product.productId === product.productId,
        );

        if (!productFound) {
          return [
            ...prev,
            { product, amount: amount || 1 } as ShoppingCartProductType,
          ];
        }

        const productIndex = prev.indexOf(productFound);

        const updatedProducts = [...prev];

        updatedProducts[productIndex] = {
          product: {
            ...product,
            productId: productFound.product.productId,
          },
          amount: amount || productFound.amount,
        } as ShoppingCartProductType;

        return updatedProducts;
      });
    },
    [setProducts],
  );

  const removeProductFromCart: RemoveProductFromCartHandles = useCallback(
    productId => {
      setProducts(prev =>
        prev.filter(productInfo => productInfo.product.productId !== productId),
      );
    },
    [setProducts],
  );

  const changeProductAmount: ChangeProductAmountHandles = useCallback(
    (productId, amount) => {
      setProducts(prev => {
        const cartProductIndex = prev.findIndex(
          p => p.product.productId === productId,
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
          product: cartProduct.product,
          amount,
        } as ShoppingCartProductType;

        return prevCopy;
      });
    },
    [setProducts],
  );

  const contextValue = useMemo(
    () => ({
      products,
      addProductToCart,
      removeProductFromCart,
      changeProductAmount,
    }),
    [products, addProductToCart, removeProductFromCart, changeProductAmount],
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
