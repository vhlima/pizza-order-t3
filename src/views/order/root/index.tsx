import Image from '../../../components/Image';

import Link from '../../../components/Link';

import PizzaBuilder from '../../../components/PizzaBuilder';

import Typography from '../../../components/Typography';

import CategoriesSection from './components/CategoriesSection';

import CustomPizzaCard from './components/CustomPizzaCard';

import EstimateDeliveryCard from './components/EstimateDeliveryCard';

const OrderPageView: React.FC = () => (
  <div className="flex flex-col">
    <Typography
      className="font-bold uppercase mb-3"
      component="h1"
      color="tertiary"
      size="lg"
    >
      Menu
    </Typography>

    <Link href="/">
      <Image
        className="max-w-full"
        src="https://cache.dominos.com/wam/prod/market/BR/_pt/images/promo/2ff76fc5-6146-4ab6-9af6-4090184829c3.jpg"
        alt="Promo"
      />
    </Link>

    <EstimateDeliveryCard />

    <PizzaBuilder>
      <CustomPizzaCard />
    </PizzaBuilder>

    <CategoriesSection />
  </div>
);

export default OrderPageView;
