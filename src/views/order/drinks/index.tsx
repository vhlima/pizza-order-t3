import Typography from '../../../components/Typography';

import DrinkProvider from '../../../components/DrinkProvider';

import DrinkList from './components/DrinkList';

import GoBackButton from '../../../components/GoBackButton';

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

    <DrinkProvider>
      <DrinkList />
    </DrinkProvider>
  </div>
);

export default DrinksPageView;
