import clsx from 'clsx';

import { useProductModal } from '../../../../../../hooks/useProductModal';

import Typography from '../../../../../Typography';

import { useLogic } from './logic';

const SizeSelector: React.FC = () => {
  const { handleSelectSize } = useLogic();

  const { productInfo } = useProductModal();

  if (!('availableSizes' in productInfo.item)) {
    return null;
  }

  const { availableSizes } = productInfo.item;

  const selectedSize = availableSizes.find(size => size.selected);

  return (
    <ul className="flex border border-blue-200 rounded-sm overflow-hidden mb-3">
      {availableSizes.map(({ sizeType: { name } }) => (
        <li
          className={clsx(
            'w-full text-center border-r last:border-r-0 border-r-blue-200',
            {
              'bg-blue-200 text-white':
                selectedSize && selectedSize.sizeType.name === name,
            },
          )}
          key={`drink-size-${name}`}
        >
          <button
            className="w-full p-1"
            type="button"
            onClick={() => handleSelectSize(name)}
          >
            <Typography
              className="font-semibold"
              component="span"
              color={
                selectedSize && selectedSize.sizeType.name === name
                  ? 'secondary'
                  : 'primary'
              }
            >
              {name}
            </Typography>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SizeSelector;
