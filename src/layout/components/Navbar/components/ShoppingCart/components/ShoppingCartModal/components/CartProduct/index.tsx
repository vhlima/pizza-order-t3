import { useShoppingCart } from '../../../../../../../../../hooks/useShoppingCart';

import Image from '../../../../../../../../../components/Image';

import Button from '../../../../../../../../../components/Button';

import Typography from '../../../../../../../../../components/Typography';

interface CartProductProps {
  id: number;
  name: string;
  imageUrl: string;
  onClickEdit: () => void;
}

const CartProduct: React.FC<CartProductProps> = ({
  id,
  imageUrl,
  name,
  onClickEdit,
}) => {
  const { products, changeProductAmount, removeProductFromCart } =
    useShoppingCart();

  return (
    <li className="p-4 border-b border-grey last-of-type:border-b-0">
      <article className="grid items-center grid-cols-[1fr_3fr_1fr] gap-2">
        <Image className="rounded-sm" src={imageUrl} alt={name} />

        <Typography className="font-bold" component="h2" color="primary">
          {name}
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
            value={`${
              products.find(({ item }) => item.product.id === id)?.amount || '1'
            }`}
            onChange={e => changeProductAmount(id, Number(e.target.value))}
          >
            {Array.from({ length: 25 })
              .map((_, index) => index + 1)
              .map(n => (
                <option key={`product-amount-option-${n}`} id={`${n}`}>
                  {n}
                </option>
              ))}
          </select>
        </div>

        <div className="flex gap-3">
          <Button className="px-4" styleType="tertiary" onClick={onClickEdit}>
            Edit
          </Button>

          <Button
            styleType="tertiary"
            onClick={() => removeProductFromCart(id)}
          >
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CartProduct;
