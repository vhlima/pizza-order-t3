import { usePizzaBuilder } from '../../../../../../hooks/usePizzaBuilderModal';

type ChangeBaseHandles = (baseCode: string) => void;

interface PizzaBasesLogicHandles {
  handleChangeBase: ChangeBaseHandles;
}

export const useLogic = (): PizzaBasesLogicHandles => {
  const { setPizza } = usePizzaBuilder();

  const handleChangeBase: ChangeBaseHandles = baseCode => {
    setPizza(prev => {
      const baseFound = prev.availableBases.find(
        baseInfo => baseInfo.base.code === baseCode,
      );

      if (!baseFound) {
        return prev;
      }

      const sizeIndex = prev.availableBases.indexOf(baseFound);

      const updatedSizes = [...prev.availableBases].map(size => ({
        ...size,
        selected: false,
      }));

      updatedSizes[sizeIndex] = { ...baseFound, selected: true };

      return {
        ...prev,
        availableBases: updatedSizes,
      };
    });
  };

  return {
    handleChangeBase,
  };
};
