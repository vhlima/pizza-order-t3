import { Fragment } from 'react';

import { useShoppingCart } from '../../hooks/useShoppingCart';

import PizzaBuilder from '../PizzaBuilder';

import ProductModal from '../ProductModalProvider';

import CartItemAny from './components/CartItemAny';

import CartItemPizza from './components/CartItemPizza';

const ShoppingCartItems: React.FC = () => {
  const { products } = useShoppingCart();

  return (
    <PizzaBuilder>
      <ProductModal>
        {products.map(({ item }) => (
          <Fragment key={`shopping-cart-item-${item.product.id}`}>
            {item.product.category.code === 'PIZZA' ? (
              <CartItemPizza id={item.product.id} />
            ) : (
              <CartItemAny id={item.product.id} />
            )}
          </Fragment>
        ))}
      </ProductModal>
    </PizzaBuilder>
  );
};

export default ShoppingCartItems;
