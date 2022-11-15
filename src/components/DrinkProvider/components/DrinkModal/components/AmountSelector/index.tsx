import { useDrinkModal } from '../../../../../../hooks/useDrinkModal';

import Typography from '../../../../../Typography';

const AmountSelector: React.FC = () => {
  const { drinkInfo, addOneToAmount, subtractOneFromAmount } = useDrinkModal();

  return (
    <div className="flex items-center ml-auto">
      <button
        className="w-10 h-10 rounded-full bg-blue-200 disabled:bg-gray-300 group"
        type="button"
        disabled={drinkInfo.amount <= 1}
        onClick={subtractOneFromAmount}
      >
        <Typography
          className="group-disabled:text-white-200"
          component="span"
          color="secondary"
          size="lg"
        >
          -
        </Typography>
      </button>

      <Typography className="mx-3" component="span">
        {drinkInfo.amount}
      </Typography>

      <button
        className="w-10 h-10 rounded-full bg-blue-200 disabled:bg-gray-300 group"
        type="button"
        disabled={drinkInfo.amount >= 25}
        onClick={addOneToAmount}
      >
        <Typography
          className="group-disabled:text-white-200"
          component="span"
          color="secondary"
          size="lg"
        >
          +
        </Typography>
      </button>
    </div>
  );
};

export default AmountSelector;
