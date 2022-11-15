import { useState } from 'react';

import { AiOutlineShoppingCart } from 'react-icons/ai';

import { useShoppingCart } from '../../../../../hooks/useShoppingCart';

import Typography from '../../../../../components/Typography';

import ShoppingCartModal from './components/ShoppingCartModal';

const ShoppingCart: React.FC = () => {
  const { pizzas } = useShoppingCart();

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      {isModalOpen && <ShoppingCartModal onClose={() => setModalOpen(false)} />}

      <button
        className="w-fit relative flex items-center ml-auto"
        type="button"
        onClick={() => setModalOpen(true)}
      >
        <AiOutlineShoppingCart className="mr-2 text-white" size={36} />

        <div className="w-6 h-6 absolute -top-1 left-6 flex items-center justify-center bg-red rounded-full">
          <Typography
            className="font-bold"
            component="span"
            color="secondary"
            size="sm"
          >
            {pizzas.length}
          </Typography>
        </div>

        <Typography
          className="font-bold uppercase"
          component="span"
          color="secondary"
          size="sm"
        >
          Cart
        </Typography>
      </button>
    </>
  );
};

export default ShoppingCart;
