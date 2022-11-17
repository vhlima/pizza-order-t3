import { trpc } from '../../../../../utils/trpc';

import { useDrinkModal } from '../../../../../hooks/useDrinkModal';

import Typography from '../../../../../components/Typography';

import Image from '../../../../../components/Image';

const DrinkList: React.FC = () => {
  const { openModal } = useDrinkModal();

  const { data } = trpc.drink.getAll.useQuery();

  if (!data) {
    return null;
  }

  return (
    <ul className="grid grid-cols-2 gap-3">
      {data.map(({ product }) => (
        <li key={`drink-list-${product.name}`}>
          <button
            className="flex flex-col w-full"
            type="button"
            onClick={() => openModal(product.id)}
          >
            <Image
              className="rounded-md"
              src={product.imageUrl}
              alt={product.name}
            />

            <Typography
              className="font-bold mt-1"
              component="h2"
              color="primary"
            >
              {product.name}
            </Typography>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DrinkList;
