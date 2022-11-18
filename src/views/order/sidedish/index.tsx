import Typography from '../../../components/Typography';

import GoBackButton from '../../../components/GoBackButton';

import SideDishList from './components/SideDishList';

import ProductModalProvider from '../../../components/ProductModalProvider';

const OrderSideDishPageView: React.FC = () => (
  <div className="flex flex-col">
    <GoBackButton backRoute="/order" />

    <div className="mt-2">
      <header className="p-2 mb-2 rounded-sm bg-blue-200">
        <Typography
          className="font-bold uppercase"
          component="h1"
          color="secondary"
        >
          Side Dishes
        </Typography>
      </header>

      <ProductModalProvider>
        <SideDishList />
      </ProductModalProvider>
    </div>
  </div>
);

export default OrderSideDishPageView;
