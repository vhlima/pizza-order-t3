import clsx from 'clsx';

import Typography from '../../../../../Typography';

interface DrinkSizesProps {
  drinkName?: string;
  sizeNames: string[];
  onClick: (sizeName: string) => void;
}

const DrinkSizes: React.FC<DrinkSizesProps> = ({
  drinkName,
  sizeNames,
  onClick,
}) => (
  <ul className="flex border border-blue-200 rounded-sm overflow-hidden mb-3">
    {sizeNames.map(name => (
      <li
        className={clsx(
          'w-full text-center border-r last:border-r-0 border-r-blue-200',
          {
            'bg-blue-200 text-white': drinkName === name,
          },
        )}
        key={`drink-size-${name}`}
      >
        <button
          className="w-full p-1"
          type="button"
          onClick={() => onClick(name)}
        >
          <Typography
            className="font-semibold"
            component="span"
            color={drinkName === name ? 'secondary' : 'primary'}
          >
            {name}
          </Typography>
        </button>
      </li>
    ))}
  </ul>
);

export default DrinkSizes;
