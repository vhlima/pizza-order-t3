import Typography from '../../../components/Typography';

import DrinkList from './components/DrinkList';

import GoBackButton from '../../../components/GoBackButton';

import ProductModalProvider from '../../../components/ProductModalProvider';

const DrinksPageView: React.FC = () => (
  <div className="flex flex-col">
    <GoBackButton backRoute="/order" />

    <Typography
      className="font-bold uppercase mb-3"
      component="h1"
      color="tertiary"
      size="lg"
    >
      Drinks
    </Typography>

    <ProductModalProvider>
      <DrinkList />
    </ProductModalProvider>
  </div>
);

export default DrinksPageView;
