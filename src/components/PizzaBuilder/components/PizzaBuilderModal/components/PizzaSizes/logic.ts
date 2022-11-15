import { usePizzaBuilder } from '../../../../../../hooks/usePizzaBuilder';

type ChangeSizeHandles = (sizeCode: string) => void;

interface PizzaSizesLogicHandles {
  handleChangeSize: ChangeSizeHandles;
}

export const useLogic = (): PizzaSizesLogicHandles => {
  const { setPizza } = usePizzaBuilder();

  const handleChangeSize: ChangeSizeHandles = sizeCode => {
    setPizza(prev => {
      const sizeFound = prev.availableSizes.find(
        size => size.sizeType.code === sizeCode,
      );

      if (!sizeFound) {
        return prev;
      }

      const sizeIndex = prev.availableSizes.indexOf(sizeFound);

      const updatedSizes = [...prev.availableSizes].map(size => ({
        ...size,
        selected: false,
      }));

      updatedSizes[sizeIndex] = { ...sizeFound, selected: true };

      return {
        ...prev,
        availableSizes: updatedSizes,
      };
    });
  };

  return {
    handleChangeSize,
  };
};
