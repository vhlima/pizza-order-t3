import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
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

  const setLocalStorage = (stringified?: string) => {
    if (!stringified) {
      localStorage.removeItem('cart');
      return;
    }

    localStorage.setItem('cart', stringified);
  };

  useEffect(() => {
    const cartItems = localStorage.getItem('cart');

    // TODO validate all fields for cart items before changing the state

    if (cartItems) {
      const cartProducts = JSON.parse(cartItems);

      setProducts(cartProducts as ShoppingCartProducts);
    }
  }, [setProducts]);

  const addProductToCart: AddProductToCartHandles = useCallback(
    ({ product, amount }) => {
      setProducts(prev => {
        const productFound = prev.find(
          productInfo => productInfo.product.productId === product.productId,
        );

        if (!productFound) {
          const updatedProducts = [
            ...prev,
            { product, amount: amount || 1 } as ShoppingCartProductType,
          ];

          setLocalStorage(JSON.stringify(updatedProducts));

          return updatedProducts;
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

        setLocalStorage(JSON.stringify(updatedProducts));

        return updatedProducts;
      });
    },
    [setProducts],
  );

  const removeProductFromCart: RemoveProductFromCartHandles = useCallback(
    productId => {
      setProducts(prev => {
        const filteredProducts = prev.filter(
          productInfo => productInfo.product.productId !== productId,
        );

        setLocalStorage(
          filteredProducts.length > 0
            ? JSON.stringify(filteredProducts)
            : undefined,
        );

        return filteredProducts;
      });
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

        const cartProduct = prev[cartProductIndex];

        if (!cartProduct) {
          return prev;
        }

        const updatedProducts = [...prev];

        updatedProducts[cartProductIndex] = {
          product: cartProduct.product,
          amount,
        } as ShoppingCartProductType;

        setLocalStorage(JSON.stringify(updatedProducts));

        return updatedProducts;
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
