import Button from '../../../../../components/Button';

import Image from '../../../../../components/Image';

import Typography from '../../../../../components/Typography';

import { useLogic } from './logic';

interface PizzaCardProps {
  productId: number;
  name: string;
  description: string;
  imageUrl: string;
}

const PizzaCard: React.FC<PizzaCardProps> = ({
  productId,
  name,
  description,
  imageUrl,
}) => {
  const { handleAddPizzaToCart, handleOpenModal } = useLogic({ productId });

  return (
    <div className="flex flex-col">
      <Image className="rounded-sm" src={imageUrl} alt={name} />

      <Typography className="font-bold mt-1" component="h2" color="primary">
        {name}
      </Typography>

      <Typography className="mt-1" component="p" size="sm">
        {description}
      </Typography>

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
    </div>
  );
};

export default PizzaCard;
