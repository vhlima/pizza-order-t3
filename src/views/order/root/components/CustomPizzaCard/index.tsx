import { usePizzaBuilder } from '../../../../../hooks/usePizzaBuilder';

import type { PizzaType } from '../../../../../hooks/usePizzaBuilder';

import { trpc } from '../../../../../utils/trpc';

import Card from '../../../../../components/Card';

import Image from '../../../../../components/Image';

import Typography from '../../../../../components/Typography';

const CustomPizzaCard: React.FC = () => {
  const { openModal } = usePizzaBuilder();

  const { data } = trpc.pizza.getPizza.useQuery();

  return (
    <button type="button" onClick={() => openModal(data as PizzaType)}>
      <Card className="p-3 flex gap-3 mt-3 hover:bg-blue-200 group">
        <Image
          src="https://cache.dominos.com/olo/6_96_8/assets/build/market/BR/_pt/images/img/entree-page/gridLayout/build.png"
          alt="Pizza"
        />

        <header className="flex flex-col gap-1">
          <Typography
            className="font-bold group-hover:text-white"
            component="h2"
            color="primary"
          >
            Custom pizza
          </Typography>

          <Typography
            className="group-hover:text-white"
            component="h3"
            size="sm"
          >
            Choose ingredients you want in your pizza
          </Typography>
        </header>
      </Card>
    </button>
  );
};

export default CustomPizzaCard;
