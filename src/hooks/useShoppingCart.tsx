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

export type ShoppingCartProductInfo<T extends { product: { id: number } }> = {
  item: T;
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
  // const cartValidationSchema = z.object({
  //   product: z.object({

  //   }),
  //   amount: z.number().min(1).max(25),
  // });

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
    ({ item, amount }) => {
      setProducts(prev => {
        const productFound = prev.find(
          productInfo => productInfo.item.product.id === item.product.id,
        );

        if (!productFound) {
          const updatedProducts = [
            ...prev,
            { item, amount: amount || 1 } as ShoppingCartProductType,
          ];

          setLocalStorage(JSON.stringify(updatedProducts));

          return updatedProducts;
        }

        const productIndex = prev.indexOf(productFound);

        const updatedProducts = [...prev];

        updatedProducts[productIndex] = {
          item: {
            ...item,
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
          ({ item }) => item.product.id !== productId,
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
          ({ item }) => item.product.id === productId,
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
          item: cartProduct.item,
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
