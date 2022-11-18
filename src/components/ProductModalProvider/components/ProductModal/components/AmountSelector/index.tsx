import { useProductModal } from '../../../../../../hooks/useProductModal';

import Typography from '../../../../../Typography';

const AmountSelector: React.FC = () => {
  const { productInfo, setProductInfo } = useProductModal();

  const addOneToAmount = () => {
    setProductInfo(prev => ({ ...prev, amount: prev.amount + 1 }));
  };

  const subtractOneFromAmount = () => {
    setProductInfo(prev => ({ ...prev, amount: prev.amount - 1 }));
  };

  return (
    <div className="flex items-center ml-auto">
      <button
        className="w-10 h-10 rounded-full bg-blue-200 disabled:bg-gray-300 group"
        type="button"
        disabled={productInfo.amount <= 1}
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
        {productInfo.amount}
      </Typography>

      <button
        className="w-10 h-10 rounded-full bg-blue-200 disabled:bg-gray-300 group"
        type="button"
        disabled={productInfo.amount >= 25}
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
