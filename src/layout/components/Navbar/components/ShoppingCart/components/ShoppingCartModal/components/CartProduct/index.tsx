import { usePizzaBuilder } from '../../../../../../../../../hooks/usePizzaBuilderModal';

import Image from '../../../../../../../../../components/Image';

import Button from '../../../../../../../../../components/Button';

import Typography from '../../../../../../../../../components/Typography';
import { useShoppingCart } from '../../../../../../../../../hooks/useShoppingCart';

interface CartProductProps {
  name: string;
  amount: number;
  imageUrl: string;
}

const CartProduct: React.FC<CartProductProps> = ({
  name,
  // amount,
  imageUrl,
}) => {
  const { openModal } = usePizzaBuilder();

  const { pizzas } = useShoppingCart();

  const cartItem = pizzas.find(p => p.pizza.name === name);

  if (!cartItem) {
    return null;
  }

  return (
    <li className="p-4 border-b border-grey last-of-type:border-b-0">
      <article className="grid items-center grid-cols-[1fr_3fr_1fr] gap-2">
        <Image className="rounded-sm" src={imageUrl} alt={name} />

        <Typography className="font-bold" component="h2" color="primary">
          30cm Medium Traditional {name}
        </Typography>

        <Typography className="text-center" component="span">
          $66.90
        </Typography>
      </article>

      <div className="flex mt-2">
        <div className="flex items-center pr-3 mr-3 border-r border-grey last:pr-0 last:mr-0 last:border-r-0">
          <Typography className="font-bold mr-2" component="span">
            Amount:
          </Typography>

          <select
            className="p-1"
            // onChange={e => changeProductAmount(productId, Number(e.target.value))}
          >
            {Array.from({ length: 25 })
              .map((_, index) => index + 1)
              .map(n => (
                <option
                  key={`product-amount-option-${n}`}
                  // selected={n === amount}
                >
                  {n}
                </option>
              ))}
          </select>
        </div>

        <div className="flex gap-3">
          <Button
            styleType="tertiary"
            onClick={() => openModal(cartItem.pizza as any)}
          >
            Edit
          </Button>

          <Button
            styleType="tertiary"
            // onClick={() => removeProductFromCart(productId)}
          >
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CartProduct;
