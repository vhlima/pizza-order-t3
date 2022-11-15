import { usePizzaBuilder } from '../../../../../../hooks/usePizzaBuilderModal';

import Typography from '../../../../../Typography';

import Topping from './components/Topping';

const PizzaToppings: React.FC = () => {
  const { pizza } = usePizzaBuilder();

  return (
    <>
      <header className="p-4 border-b border-grey">
        <Typography className="font-bold" component="span" color="tertiary">
          Ordenar por:
        </Typography>
      </header>

      <ul>
        {pizza.toppings.map(({ topping }, index) => (
          <Topping
            key={`pizza-topping-${topping.code}`}
            code={topping.code}
            name={topping.name}
            alternativeBackground={index % 2 === 0}
          />
        ))}
      </ul>
    </>
  );
};

export default PizzaToppings;
