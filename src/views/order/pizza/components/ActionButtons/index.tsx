import Button from '../../../../../components/Button';

import { useLogic } from './logic';

interface ActionButtonProps {
  productId: number;
}

const ActionButtons: React.FC<ActionButtonProps> = ({ productId }) => {
  const { handleAddPizzaToCart, handleOpenModal } = useLogic({ productId });

  return (
    <div className="mt-auto">
      <Button
        className="w-full uppercase mt-4 mb-2"
        styleType="primary"
        onClick={handleAddPizzaToCart}
      >
        Add directly to cart
      </Button>

      <Button
        className="w-full uppercase"
        styleType="secondary"
        onClick={handleOpenModal}
      >
        Customize
      </Button>
    </div>
  );
};

export default ActionButtons;
