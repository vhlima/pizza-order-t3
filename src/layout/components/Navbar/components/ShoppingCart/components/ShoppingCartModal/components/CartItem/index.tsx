import type { ShoppingCartItem } from '../../../../../../../../../types/shopping-cart';

import { useProductModal } from '../../../../../../../../../hooks/useProductModal';

import { useShoppingCart } from '../../../../../../../../../hooks/useShoppingCart';

import CartProduct from '../CartProduct';

interface CartItemProps {
  id: number;
}

const CartItem: React.FC<CartItemProps> = ({ id }) => {
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
    <CartProduct
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

export default CartItem;
