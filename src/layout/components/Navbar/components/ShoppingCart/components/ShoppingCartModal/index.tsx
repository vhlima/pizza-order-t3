import { AiOutlineClose } from 'react-icons/ai';

import type { ModalHandles } from '../../../../../../../components/Modal';

import { useShoppingCart } from '../../../../../../../hooks/useShoppingCart';

import Modal from '../../../../../../../components/Modal';

import Typography from '../../../../../../../components/Typography';

import Button from '../../../../../../../components/Button';

import CartProduct from './components/CartProduct';
import PizzaBuilder from '../../../../../../../components/PizzaBuilder';

type ShoppingCartModalProps = ModalHandles;

const ShoppingCartModal: React.FC<ShoppingCartModalProps> = ({ onClose }) => {
  const { pizzas } = useShoppingCart();

  return (
    <Modal className="w-screen h-screen flex flex-col" onClose={onClose}>
      <header className="flex items-center p-2 border-b-2 border-blue-200">
        <Typography
          className="font-bold uppercase"
          component="h1"
          color="primary"
          size="lg"
        >
          Your cart
        </Typography>

        <button
          className="ml-auto text-blue-100"
          type="button"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>
      </header>

      {pizzas.length === 0 ? (
        <div className="flex flex-col items-center p-4">
          <Typography className="font-bold" component="p" color="tertiary">
            Your cart is empty, but your belly doesn&apos;t have to be. Add your
            preferred items and come back here to complete your order.
          </Typography>

          <Button
            className="w-fit mt-4 uppercase"
            styleType="primary"
            onClick={onClose}
          >
            Start shopping
          </Button>
        </div>
      ) : (
        <>
          <PizzaBuilder>
            <ul className="flex flex-col">
              {pizzas.map(productInfo => (
                <CartProduct
                  key={`product-info-${productInfo.pizza.productId}`}
                  name={productInfo.pizza.name}
                  amount={productInfo.amount}
                  imageUrl={productInfo.pizza.imageUrl}
                />
              ))}
            </ul>
          </PizzaBuilder>

          <div className="w-full mt-auto p-2 bg-white-200 border-t-2 border-blue-100">
            <Typography className="font-bold" component="h2" color="tertiary">
              Subtotal: $133.80
            </Typography>

            <div className="flex gap-2 mt-3">
              <Button
                className="uppercase"
                styleType="secondary"
                onClick={onClose}
              >
                Continue shopping
              </Button>

              <Button
                className="uppercase"
                styleType="primary"
                onClick={onClose}
              >
                Finish order
              </Button>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ShoppingCartModal;
