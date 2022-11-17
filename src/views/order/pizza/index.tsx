import { trpc } from '../../../utils/trpc';

import Typography from '../../../components/Typography';

import PizzaBuilder from '../../../components/PizzaBuilder';

import GoBackButton from '../../../components/GoBackButton';

import ProductCard from '../../../components/ProductCard';

import ActionButtons from './components/ActionButtons';

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
            <ul className="grid grid-cols-2 gap-2">
              {data.map(({ product, description }) => (
                <ProductCard
                  key={`product-card-${product.id}`}
                  name={product.name}
                  description={description}
                  imageUrl={product.imageUrl}
                >
                  <ActionButtons productId={product.id} />
                </ProductCard>
              ))}
            </ul>
          </PizzaBuilder>
        )}
      </div>
    </div>
  );
};

export default OrderPizzaPageView;
