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
      addProductToCart({ product: cachedData });
      return;
    }

    if (isError) return;

    const { data } = await refetch();

    if (data) {
      addProductToCart({ product: data });
    }
  };

  const handleOpenModal = async () => {
    if (cachedData) {
      openModal({
        ...cachedData,
        name: `${cachedData.name} Custom`,
        productId: Math.floor(Math.random() * (2000 - 1000)) + 1000,
      });

      return;
    }

    if (isError) return;

    const { data } = await refetch();

    if (data) {
      openModal({
        ...data,
        name: `${data.name} Custom`,
        productId: Math.floor(Math.random() * (2000 - 1000)) + 1000,
      });
    }
  };

  return {
    handleAddPizzaToCart,
    handleOpenModal,
  };
};
