import type { DrinkType } from '../../../../../../../../../hooks/useDrinkModal';

import { useDrinkModal } from '../../../../../../../../../hooks/useDrinkModal';

import type { ShoppingCartProductInfo } from '../../../../../../../../../hooks/useShoppingCart';

import { useShoppingCart } from '../../../../../../../../../hooks/useShoppingCart';

import CartProduct from '../CartProduct';

interface CartDrinkProps {
  id: number;
}

const CartDrink: React.FC<CartDrinkProps> = ({ id }) => {
  const { openModal } = useDrinkModal();

  const { products } = useShoppingCart();

  const findDrink = () => {
    const productFound = products.find(({ item }) => item.product.id === id);

    if (productFound) {
      return productFound as ShoppingCartProductInfo<DrinkType>;
    }

    return null;
  };

  const handleOpenModal = () => {
    const productFound = findDrink();

    if (productFound) {
      openModal(productFound.item.product.id);
    }
  };

  const drink = findDrink();

  if (!drink) {
    return null;
  }

  const {
    item: { product, availableSizes },
  } = drink;

  const selectedSize = availableSizes.find(size => size.selected);

  return (
    <CartProduct
      id={id}
      imageUrl={product.imageUrl}
      name={
        !selectedSize
          ? product.name
          : `${selectedSize?.drinkSize.name} ${product.name}`
      }
      onClickEdit={handleOpenModal}
    />
  );
};

export default CartDrink;
