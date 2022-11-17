import { usePizzaBuilder } from '../../../../../hooks/usePizzaBuilder';

import { useShoppingCart } from '../../../../../hooks/useShoppingCart';

import { trpc } from '../../../../../utils/trpc';

interface PizzaCardLogicProps {
  productId: number;
}

interface PizzaCardLogicHandles {
  handleAddPizzaToCart: () => Promise<void>;
  handleOpenModal: () => Promise<void>;
}

export const useLogic = ({
  productId,
}: PizzaCardLogicProps): PizzaCardLogicHandles => {
  const { addProductToCart } = useShoppingCart();

  const { openModal } = usePizzaBuilder();

  const {
    data: cachedData,
    isError,
    refetch,
  } = trpc.pizza.getPizzaById.useQuery({ id: productId }, { enabled: false });

  const handleAddPizzaToCart = async () => {
    if (cachedData) {
      addProductToCart({ item: cachedData });
      return;
    }

    if (isError) return;

    const { data } = await refetch();

    if (data) {
      addProductToCart({ item: data });
    }
  };

  const handleOpenModal = async () => {
    if (cachedData) {
      openModal({
        ...cachedData,
        product: {
          ...cachedData.product,
          id: Math.floor(Math.random() * (2000 - 1000)) + 1000,
          name: `${cachedData.product.name} Custom`,
        },
      });

      return;
    }

    if (isError) return;

    const { data } = await refetch();

    if (data) {
      openModal({
        ...data,
        product: {
          ...data.product,
          id: Math.floor(Math.random() * (2000 - 1000)) + 1000,
          name: `${data.product.name} Custom`,
        },
      });
    }
  };

  return {
    handleAddPizzaToCart,
    handleOpenModal,
  };
};
