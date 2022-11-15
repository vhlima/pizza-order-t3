import { usePizzaBuilder } from '../../../../../../hooks/usePizzaBuilder';

import Typography from '../../../../../Typography';

import { useLogic } from './logic';

const PizzaBases: React.FC = () => {
  const { pizza } = usePizzaBuilder();

  const { handleChangeBase } = useLogic();

  const selectedBase = pizza.availableBases.find(base => base.selected);

  return (
    <div className="flex flex-col justify-center gap-1">
      {pizza.availableBases.map(({ base: { code, name } }) => (
        <label key={`pizza-base-${code}`} htmlFor={code}>
          <input
            className="mr-1"
            type="radio"
            id={code}
            checked={selectedBase ? selectedBase.base.code === code : false}
            onChange={() => handleChangeBase(code)}
          />

          <Typography
            className="font-bold uppercase"
            component="span"
            color="primary"
          >
            {name}
          </Typography>
        </label>
      ))}
    </div>
  );
};

export default PizzaBases;
