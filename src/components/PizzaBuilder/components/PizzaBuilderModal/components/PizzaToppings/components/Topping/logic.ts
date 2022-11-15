import { usePizzaBuilder } from '../../../../../../../../hooks/usePizzaBuilder';

type SelectToppingHandles = (toppingCode: string) => void;

interface ToppingLogicHandles {
  handleSelectTopping: SelectToppingHandles;
}

export const useLogic = (): ToppingLogicHandles => {
  const { setPizza } = usePizzaBuilder();

  const handleSelectTopping: SelectToppingHandles = toppingCode => {
    setPizza(prev => {
      const toppingFound = prev.toppings.find(
        toppingInfo => toppingInfo.topping.code === toppingCode,
      );

      if (!toppingFound) {
        return prev;
      }

      const sizeIndex = prev.toppings.indexOf(toppingFound);

      const updatedToppings = [...prev.toppings];

      updatedToppings[sizeIndex] = {
        ...toppingFound,
        include: !toppingFound.include,
      };

      return {
        ...prev,
        toppings: updatedToppings,
      };
    });
  };

  return {
    handleSelectTopping,
  };
};
