import clsx from 'clsx';

import { usePizzaBuilder } from '../../../../../../../../hooks/usePizzaBuilder';

import Typography from '../../../../../../../Typography';

import { useLogic } from './logic';

interface ToppingProps {
  code: string;
  name: string;
  alternativeBackground?: boolean;
}

const Topping: React.FC<ToppingProps> = ({
  code,
  name,
  alternativeBackground,
}) => {
  const { pizza } = usePizzaBuilder();

  const { handleSelectTopping } = useLogic();

  const isToppingSelected = pizza.toppings.find(
    toppingInfo => toppingInfo.topping.code === code,
  )?.include;

  return (
    <li
      className={clsx('border-b border-grey', {
        'bg-[#0078ae0d]': alternativeBackground,
      })}
    >
      <label className="block w-full px-6 py-4 select-none" htmlFor={name}>
        <input
          id={name}
          type="checkbox"
          checked={isToppingSelected}
          onChange={() => handleSelectTopping(code)}
        />

        <Typography className="ml-2" component="span" size="sm">
          {name}
        </Typography>
      </label>

      {isToppingSelected && (
        <div>
          <h1>checked</h1>
        </div>
      )}
    </li>
  );
};

export default Topping;
