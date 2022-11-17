import { BsCheckCircleFill } from 'react-icons/bs';

import type { ModalHandles } from '../../../Modal';

import { useDrinkModal } from '../../../../hooks/useDrinkModal';

import { useShoppingCart } from '../../../../hooks/useShoppingCart';

import Image from '../../../Image';

import Modal from '../../../Modal';

import StepCard from '../../../StepCard';

import Typography from '../../../Typography';

import DrinkSizes from './components/DrinkSizes';

import Button from '../../../Button';

import AmountSelector from './components/AmountSelector';

type DrinkModalProps = ModalHandles;

const DrinkModal: React.FC<DrinkModalProps> = ({ onClose }) => {
  const {
    drinkInfo: { drink, amount },
    selectDrinkSize,
  } = useDrinkModal();

  const { addProductToCart } = useShoppingCart();

  const selectedSize = drink.availableSizes.find(size => size.selected);

  const handleAddToCart = () => {
    addProductToCart({
      item: drink,
      amount,
    });

    onClose();
  };

  if (!drink) {
    return null;
  }

  const { product, availableSizes } = drink;

  return (
    <Modal className="w-11/12 rounded-md" center backdrop onClose={onClose}>
      <header className="flex items-center p-4">
        <Typography className="font-bold uppercase" component="h1" size="lg">
          {product.name}
        </Typography>

        <button
          className="ml-auto h-fit py-0.5 px-1 text-2xl rounded-md bg-gray-300"
          type="button"
          onClick={onClose}
        >
          X
        </button>
      </header>

      <Image
        className="px-4"
        src={product.imageUrl}
        alt={product.name}
        unoptimized
      />

      <div className="flex flex-col gap-4 p-4">
        <StepCard title="Make your choice">
          {availableSizes.length > 1 && (
            <DrinkSizes
              drinkName={selectedSize?.drinkSize?.name}
              sizeNames={availableSizes.map(size => size.drinkSize.name)}
              onClick={sizeName => selectDrinkSize(sizeName)}
            />
          )}

          <div className="flex items-center">
            <Typography className="font-bold" component="h3">
              {product.name}
            </Typography>

            <AmountSelector />
          </div>
        </StepCard>

        <StepCard className="flex items-center" title="Item">
          <BsCheckCircleFill className="text-green-600 mr-2" size={20} />

          <Typography className="font-bold mr-2" component="span">
            ({amount})
          </Typography>

          {selectedSize && (
            <Typography className="font-bold mr-1" component="span">
              {selectedSize.drinkSize.name}
            </Typography>
          )}

          <Typography className="font-bold" component="span">
            {product.name}
          </Typography>
        </StepCard>

        <div className="flex gap-2">
          <Button className="w-full" styleType="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button
            className="w-full"
            styleType="primary"
            onClick={handleAddToCart}
          >
            Add directly to cart
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DrinkModal;
