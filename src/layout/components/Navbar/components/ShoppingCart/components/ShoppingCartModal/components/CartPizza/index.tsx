import type { PizzaType } from '../../../../../../../../../hooks/usePizzaBuilder';

import { usePizzaBuilder } from '../../../../../../../../../hooks/usePizzaBuilder';

import type { ShoppingCartProductInfo } from '../../../../../../../../../hooks/useShoppingCart';

import { useShoppingCart } from '../../../../../../../../../hooks/useShoppingCart';

import CartProduct from '../CartProduct';

interface CartPizzaProps {
  id: number;
}

const CartPizza: React.FC<CartPizzaProps> = ({ id }) => {
  const { openModal } = usePizzaBuilder();

  const { products } = useShoppingCart();

  const findCartProduct = () => {
    const cartProduct = products.find(({ item }) => item.product.id === id);

    if (cartProduct) {
      return cartProduct as ShoppingCartProductInfo<PizzaType>;
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
    <CartProduct
      id={id}
      name={`${selectedSize?.sizeType?.size} cm ${selectedSize?.sizeType?.name} ${selectedBase?.base?.name} ${product.name}`}
      imageUrl={product.imageUrl}
      onClickEdit={handleOpenModal}
    />
  );
};

export default CartPizza;
