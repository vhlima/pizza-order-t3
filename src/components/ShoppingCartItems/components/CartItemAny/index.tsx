import type { ShoppingCartItem } from '../../../../types/shopping-cart';

import { useProductModal } from '../../../../hooks/useProductModal';

import { useShoppingCart } from '../../../../hooks/useShoppingCart';

import CartItem from '../CartItem';

interface CartItemAnyProps {
  id: number;
}

const CartItemAny: React.FC<CartItemAnyProps> = ({ id }) => {
  const { openModal } = useProductModal();

  const { products } = useShoppingCart();

  const findProduct = () =>
    products.find(({ item }) => item.product.id === id) as
      | ShoppingCartItem
      | undefined;

  const handleOpenModal = () => {
    const productFound = findProduct();

    if (productFound) {
      openModal({ item: productFound.item });
    }
  };

  const productInfo = findProduct();

  if (!productInfo) {
    return null;
  }

  const { item } = productInfo;

  const selectedSize =
    'availableSizes' in productInfo.item
      ? productInfo.item.availableSizes.find(size => size.selected)
      : undefined;

  return (
    <CartItem
      id={id}
      imageUrl={item.product.imageUrl}
      name={
        !selectedSize
          ? item.product.name
          : `${selectedSize ? `${selectedSize.sizeType.name} ` : ''}${
              item.product.name
            }`
      }
      onClickEdit={handleOpenModal}
    />
  );
};

export default CartItemAny;
