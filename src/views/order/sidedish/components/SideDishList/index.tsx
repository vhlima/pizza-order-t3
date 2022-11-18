import { useProductModal } from '../../../../../hooks/useProductModal';

import { trpc } from '../../../../../utils/trpc';

import ProductCard from '../../../../../components/ProductCard';

const SideDishList: React.FC = () => {
  const { productInfo, productId, setProductId, openModal } = useProductModal();

  trpc.sideDish.getById.useQuery(
    { id: productId },
    {
      enabled: productId !== -1 && Object.keys(productInfo).length === 0,
      onSuccess: data => data && openModal({ item: data }),
    },
  );

  const { data } = trpc.sideDish.getAll.useQuery();

  if (!data) {
    return null;
  }

  return (
    <ul className="grid grid-cols-2 gap-2">
      {data.map(sideDish => (
        <ProductCard
          key={`side-dish-${sideDish.product.id}`}
          name={sideDish.product.name}
          imageUrl={sideDish.product.imageUrl}
          description={sideDish.description}
          onClick={() => setProductId(sideDish.product.id)}
        />
      ))}
    </ul>
  );
};

export default SideDishList;
