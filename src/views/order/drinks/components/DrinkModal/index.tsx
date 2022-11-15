import { useState } from 'react';

import { BsCheckCircleFill } from 'react-icons/bs';

import type { ModalHandles } from '../../../../../components/Modal';

import { trpc } from '../../../../../utils/trpc';

import Image from '../../../../../components/Image';

import Modal from '../../../../../components/Modal';

import StepCard from '../../../../../components/StepCard';

import Typography from '../../../../../components/Typography';

import DrinkSizes from './components/DrinkSizes';

import Button from '../../../../../components/Button';
import AmountSelector from './components/AmountSelector';

interface DrinkModalProps extends ModalHandles {
  drinkId: number;
}

const DrinkModal: React.FC<DrinkModalProps> = ({ drinkId, onClose }) => {
  const [selectedSizeId, setSelectedSizeId] = useState<string>();

  const { data } = trpc.drink.getById.useQuery({
    id: drinkId,
  });

  const handleSelectSize = (sizeName: string) => {
    setSelectedSizeId(sizeName);
  };

  if (!data) {
    return null;
  }

  return (
    <Modal className="w-11/12 rounded-md" center backdrop onClose={onClose}>
      <header className="flex items-center p-4">
        <Typography className="font-bold uppercase" component="h1" size="lg">
          {data.name}
        </Typography>

        <button
          className="ml-auto h-fit py-0.5 px-1 text-2xl rounded-md bg-gray-300"
          type="button"
          onClick={onClose}
        >
          X
        </button>
      </header>

      <Image className="px-4" src={data.imageUrl} alt={data.name} unoptimized />

      <div className="flex flex-col gap-4 p-4">
        <StepCard title="Make your choice">
          {data.availableSizes.length > 1 && (
            <DrinkSizes
              drinkName={selectedSizeId}
              sizeNames={data.availableSizes.map(size => size.drinkSize.name)}
              onClick={sizeName => handleSelectSize(sizeName)}
            />
          )}

          <div className="flex items-center">
            <Typography className="font-bold" component="h3">
              {data.name}
            </Typography>

            <AmountSelector onClickAdd={() => ({})} onClickSub={() => ({})} />
          </div>
        </StepCard>

        <StepCard className="flex items-center" title="Item">
          <BsCheckCircleFill className="text-green-600 mr-2" size={20} />

          <Typography className="font-bold mr-2" component="span">
            (1)
          </Typography>

          {selectedSizeId && (
            <Typography className="font-bold mr-1" component="span">
              {
                data.availableSizes.find(
                  size => size.drinkSize.name === selectedSizeId,
                )?.drinkSize.name
              }
            </Typography>
          )}

          <Typography className="font-bold" component="span">
            {data.name}
          </Typography>
        </StepCard>

        <div className="flex gap-2">
          <Button className="w-full" styleType="secondary">
            Cancel
          </Button>

          <Button className="w-full" styleType="primary">
            Add directly to cart
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DrinkModal;
