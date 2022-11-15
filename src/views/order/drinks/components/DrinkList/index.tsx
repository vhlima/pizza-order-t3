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
      {data.map(drink => (
        <li key={`drink-list-${drink.name}`}>
          <button
            className="flex flex-col w-full"
            type="button"
            onClick={() => openModal(drink.productId)}
          >
            <Image
              className="rounded-md"
              src={drink.imageUrl}
              alt={drink.name}
            />

            <Typography
              className="font-bold mt-1"
              component="h2"
              color="primary"
            >
              {drink.name}
            </Typography>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DrinkList;
