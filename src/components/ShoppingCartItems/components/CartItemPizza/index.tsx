import type { PizzaType } from '../../../../hooks/usePizzaBuilder';

import type { ShoppingCartItemInfo } from '../../../../types/shopping-cart';

import { usePizzaBuilder } from '../../../../hooks/usePizzaBuilder';

import { useShoppingCart } from '../../../../hooks/useShoppingCart';

import CartItem from '../CartItem';

interface CartItemPizzaProps {
  id: number;
}

const CartItemPizza: React.FC<CartItemPizzaProps> = ({ id }) => {
  const { openModal } = usePizzaBuilder();

  const { products } = useShoppingCart();

  const findCartProduct = () => {
    const cartProduct = products.find(({ item }) => item.product.id === id);

    if (cartProduct) {
      return cartProduct as ShoppingCartItemInfo<PizzaType>;
    }

    return null;
  };

  const handleOpenModal = () => {
    const productFound = findCartProduct();

    if (productFound) {
      openModal(productFound.item);
    }
  };

  const cartProduct = findCartProduct();

  if (!cartProduct) {
    return null;
  }

  const {
    item: { product, availableBases, availableSizes },
  } = cartProduct;

  const selectedSize = availableSizes.find(size => size.selected);

  const selectedBase = availableBases.find(base => base.selected);

  return (
    <CartItem
      id={id}
      name={`${selectedSize?.sizeType?.size} cm ${selectedSize?.sizeType?.name} ${selectedBase?.base?.name} ${product.name}`}
      imageUrl={product.imageUrl}
      onClickEdit={handleOpenModal}
    />
  );
};

export default CartItemPizza;
