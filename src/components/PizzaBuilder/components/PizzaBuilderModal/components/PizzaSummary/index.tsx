import { usePizzaBuilder } from '../../../../../../hooks/usePizzaBuilderModal';

import { useShoppingCart } from '../../../../../../hooks/useShoppingCart';

import Typography from '../../../../../Typography';

import StepCard from '../StepCard';

interface PizzaSummaryCardProps {
  onSubmit: () => void;
}

const PizzaSummaryCard: React.FC<PizzaSummaryCardProps> = ({ onSubmit }) => {
  const { pizza } = usePizzaBuilder();

  const { addPizzaToCart } = useShoppingCart();

  const selectedSize = pizza.availableSizes.find(size => size.selected);

  const selectedBase = pizza.availableBases.find(base => base.selected);

  const handleSubmit = () => {
    onSubmit();

    addPizzaToCart(pizza);
  };

  return (
    <StepCard title="My Pizza">
      <div className="mb-4">
        <Typography component="h3">
          {selectedSize?.sizeType.size} cm Pizza Builder&nbsp;
          {selectedBase?.base?.name}
        </Typography>
      </div>

      <button
        className="w-full p-4 rounded-sm bg-red"
        type="button"
        onClick={handleSubmit}
      >
        <Typography
          className="font-bold uppercase"
          component="span"
          color="secondary"
        >
          Add directly to cart
        </Typography>
      </button>
    </StepCard>
  );
};

export default PizzaSummaryCard;
