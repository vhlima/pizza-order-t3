import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

import type { PropsWithChildren, Dispatch, SetStateAction } from 'react';

import type { ShoppingCartItem } from '../types/shopping-cart';

import { useShoppingCart } from './useShoppingCart';

type OpenModalHandles = (product: Pick<ShoppingCartItem, 'item'>) => void;

interface ProductContextHandles {
  productId: number;
  setProductId: Dispatch<SetStateAction<number>>;

  productInfo: ShoppingCartItem;
  setProductInfo: Dispatch<SetStateAction<ShoppingCartItem>>;

  openModal: OpenModalHandles;
  closeModal: () => void;
}

export const ProductContext = createContext({} as ProductContextHandles);

export const ProductModalProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [productId, setProductId] = useState<number>(-1);

  /*
    This can be just product returned from database query with default props
    or it can be directly from user's cart cache.
  */
  const [productInfo, setProductInfo] = useState<ShoppingCartItem>(
    {} as ShoppingCartItem,
  );

  const { products } = useShoppingCart();

  const openModal: OpenModalHandles = useCallback(
    async ({ item }) => {
      /* Try to find product from user's cart. */
      const productExists = products.find(
        ({ item: currentItem }) => currentItem.product.id === item.product.id,
      );

      /* If the product its not present in user's cart we have to fetch it. */
      if (!productExists) {
        setProductInfo({
          item,
          amount: 1,
        } as ShoppingCartItem);

        return;
      }

      /* 
        If we already have the product in user's cart we
        just pass its props to productInfo. 
      */
      setProductInfo({
        item: productExists.item,
        amount: productExists.amount,
      } as ShoppingCartItem);
    },
    [products, setProductInfo],
  );

  const closeModal = useCallback(() => {
    /* Reset productInfo */
    setProductId(-1);
    setProductInfo({} as ShoppingCartItem);
  }, [setProductInfo, setProductId]);

  const contextValue = useMemo(
    () => ({
      productId,
      setProductId,
      productInfo,
      setProductInfo,
      openModal,
      closeModal,
    }),
    [
      productId,
      setProductId,
      productInfo,
      setProductInfo,
      openModal,
      closeModal,
    ],
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export function useProductModal(): ProductContextHandles {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProductModal must be used within an provider');
  }

  return context;
}
