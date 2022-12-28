import { useShoppingCart } from '../../../hooks/useShoppingCart';

import Button from '../../../components/Button';

import StepCard from '../../../components/StepCard';

import Typography from '../../../components/Typography';

import Link from '../../../components/Link';

import ProductCard from '../../../components/ProductCard';

import ShoppingCartItems from '../../../components/ShoppingCartItems';

const OrderCheckoutView: React.FC = () => {
  const { products } = useShoppingCart();

  return (
    <div className="flex flex-col">
      <Typography
        className="font-bold uppercase mb-3"
        component="h1"
        color="tertiary"
        size="lg"
      >
        Checkout
      </Typography>

      <StepCard className="p-2 bg-white" title="Order details" padding={false}>
        <div className="flex items-center gap-2 mb-2">
          <Typography className="font-bold" component="h3">
            View your order here
          </Typography>

          <Link className="ml-auto border-2 border-blue-200 p-2" href="/order">
            <Typography className="uppercase" component="span" color="primary">
              Add more items
            </Typography>
          </Link>
        </div>

        <StepCard
          styleType="secondary"
          title="Step 1: Confirm your order"
          padding={false}
        >
          <ShoppingCartItems />
        </StepCard>

        <StepCard
          className="grid grid-cols-3 gap-4"
          styleType="secondary"
          title="Step 2: Choose your side dishes"
        >
          {[1, 2, 3].map(n => (
            <ProductCard
              key={`side-dish-${n}`}
              name="Cheesebread Calabresa"
              imageUrl="https://cache.dominos.com/olo/6_98_8/assets/build/market/BR/_pt/images/img/products/thumbnails/F_CBCALA.jpg"
              small
            />
          ))}
        </StepCard>

        <StepCard
          className="grid grid-cols-3 gap-4"
          styleType="secondary"
          title="Step 3: Choose your desserts"
        >
          {[1, 2, 3].map(n => (
            <ProductCard
              key={`desserts-${n}`}
              name="Churrosbread"
              imageUrl="https://cache.dominos.com/olo/6_98_8/assets/build/market/BR/_pt/images/img/products/thumbnails/F_CHUROBRD.jpg"
              small
            />
          ))}
        </StepCard>

        <StepCard
          className="grid grid-cols-3 gap-4"
          styleType="secondary"
          title="Step 4: Choose your drinks"
        >
          {[1, 2, 3].map(n => (
            <ProductCard
              key={`drinks-${n}`}
              name="Coca-Cola"
              imageUrl="https://cache.dominos.com/olo/6_98_8/assets/build/market/BR/_pt/images/img/products/thumbnails/F_COKE.jpg"
              small
            />
          ))}
        </StepCard>

        <StepCard
          className="flex flex-col"
          styleType="secondary"
          title="Order total"
          padding={false}
        >
          <Typography
            className="font-bold p-2 border-b border-b-grey"
            component="span"
            size="sm"
          >
            Subtotal: $66.90
          </Typography>

          <Typography
            className="font-bold p-2 border-b border-b-grey"
            component="span"
            size="sm"
          >
            Delivery fee: $6.90
          </Typography>

          <Typography className="font-bold p-2" component="span" size="lg">
            Total: $66.90
          </Typography>
        </StepCard>

        <div>
          <label className="block py-2" htmlFor="promo_code">
            <Typography className="font-bold" component="p">
              Do you have a discount or promo code?
            </Typography>
          </label>

          <div className="grid gap-2 grid-cols-[2fr_1fr]">
            <input
              className="outline-0 px-2 border border-grey-200"
              id="promo_code"
            />

            <Button styleType="primary">Apply</Button>
          </div>
        </div>

        <Button className="w-full py-2 mt-4" styleType="primary">
          Go to checkout
        </Button>
      </StepCard>
    </div>
  );
};

export default OrderCheckoutView;
