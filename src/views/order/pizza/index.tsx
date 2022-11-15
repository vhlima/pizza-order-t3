import { trpc } from '../../../utils/trpc';

import Typography from '../../../components/Typography';

import PizzaCard from './components/PizzaCard';

import PizzaBuilder from '../../../components/PizzaBuilder';

import GoBackButton from '../../../components/GoBackButton';

const OrderPizzaPageView: React.FC = () => {
  const { data } = trpc.pizza.getAll.useQuery();

  return (
    <div className="flex flex-col">
      <GoBackButton backRoute="/order" />

      <Typography
        className="font-bold uppercase mb-3"
        component="h1"
        color="tertiary"
        size="lg"
      >
        Pizza
      </Typography>

      <div>
        <header className="p-2 mb-2 rounded-sm bg-blue-200">
          <Typography
            className="font-bold uppercase"
            component="h2"
            color="secondary"
          >
            Top choices
          </Typography>
        </header>

        {data && (
          <PizzaBuilder>
            <ul className="grid grid-cols-2 gap-3">
              {data.map(pizza => (
                <PizzaCard
                  key={`pizza-card-${pizza.productId}`}
                  pizza={pizza}
                />
              ))}
            </ul>
          </PizzaBuilder>
        )}
      </div>
    </div>
  );
};

export default OrderPizzaPageView;
