import type { PizzaType } from '../../../../../hooks/usePizzaBuilderModal';
import { usePizzaBuilder } from '../../../../../hooks/usePizzaBuilderModal';

import { useShoppingCart } from '../../../../../hooks/useShoppingCart';

import Button from '../../../../../components/Button';

import Image from '../../../../../components/Image';

import Typography from '../../../../../components/Typography';

interface PizzaCardProps {
  pizza: PizzaType;
}

const PizzaCard: React.FC<PizzaCardProps> = ({ pizza }) => {
  const { addPizzaToCart } = useShoppingCart();

  const { openModal } = usePizzaBuilder();

  return (
    <div className="flex flex-col">
      <Image className="rounded-sm" src={pizza.imageUrl} alt={pizza.name} />

      <Typography className="font-bold mt-1" component="h2" color="primary">
        {pizza.name}
      </Typography>

      <Typography className="mt-1" component="p" size="sm">
        {pizza.description}
      </Typography>

      <div className="mt-auto">
        <Button
          className="w-full uppercase mt-4 mb-2"
          styleType="primary"
          onClick={() => addPizzaToCart(pizza)}
        >
          Add directly to cart
        </Button>

        <Button
          className="w-full uppercase"
          styleType="secondary"
          onClick={() =>
            openModal({
              ...pizza,
              name: `${pizza.name} Custom`,
              productId: Math.floor(Math.random() * (2000 - 1000)) + 1000,
            })
          }
        >
          Customize
        </Button>
      </div>
    </div>
  );
};

export default PizzaCard;
