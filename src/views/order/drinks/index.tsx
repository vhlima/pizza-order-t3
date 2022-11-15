import { useState } from 'react';

import { trpc } from '../../../utils/trpc';

import Drink from './components/Drink';

import Typography from '../../../components/Typography';

import DrinkModal from './components/DrinkModal';

const DrinksPageView: React.FC = () => {
  const { data } = trpc.drink.getAll.useQuery();

  const [modalDrinkId, setModalDrinkId] = useState<number>();

  return (
    <>
      {modalDrinkId && (
        <DrinkModal
          drinkId={modalDrinkId}
          onClose={() => setModalDrinkId(undefined)}
        />
      )}

      <div className="flex flex-col">
        <Typography
          className="font-bold uppercase mb-3"
          component="h1"
          color="tertiary"
          size="lg"
        >
          Drinks
        </Typography>

        {data && (
          <ul className="grid grid-cols-2 gap-3">
            {data.map(drink => (
              <Drink
                key={`drink-list-${drink.name}`}
                name={drink.name}
                imageUrl={drink.imageUrl}
                onClick={() => setModalDrinkId(drink.productId)}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DrinksPageView;
