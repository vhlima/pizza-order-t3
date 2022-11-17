import { trpc } from '../../../../../utils/trpc';

import { useDrinkModal } from '../../../../../hooks/useDrinkModal';

import ProductCard from '../../../../../components/ProductCard';

const DrinkList: React.FC = () => {
  const { openModal } = useDrinkModal();

  const { data } = trpc.drink.getAll.useQuery();

  if (!data) {
    return null;
  }

  return (
    <ul className="grid grid-cols-2 gap-3">
      {data.map(({ product }) => (
        <ProductCard
          key={`drink-list-${product.name}`}
          name={product.name}
          imageUrl={product.imageUrl}
          onClick={() => openModal(product.id)}
        />
      ))}
    </ul>
  );
};

export default DrinkList;
