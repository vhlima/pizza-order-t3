import { trpc } from '../../../../../utils/trpc';

import { useProductModal } from '../../../../../hooks/useProductModal';

import ProductCard from '../../../../../components/ProductCard';

const DrinkList: React.FC = () => {
  const { productInfo, productId, setProductId, openModal } = useProductModal();

  trpc.drink.getById.useQuery(
    { id: productId },
    {
      enabled: productId !== -1 && Object.keys(productInfo).length === 0,
      onSuccess: data => data && openModal({ item: data }),
    },
  );

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
          onClick={() => setProductId(product.id)}
        />
      ))}
    </ul>
  );
};

export default DrinkList;
