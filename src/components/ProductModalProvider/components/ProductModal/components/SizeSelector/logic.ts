import { useProductModal } from '../../../../../../hooks/useProductModal';

type SelectSizeHandles = (sizeName: string) => void;

interface ProductModalLogicHandles {
  handleSelectSize: SelectSizeHandles;
}

export const useLogic = (): ProductModalLogicHandles => {
  const { setProductInfo } = useProductModal();

  const handleSelectSize = (sizeName: string) => {
    setProductInfo(prev => {
      if (!('availableSizes' in prev.item)) return prev;

      const { availableSizes } = prev.item;

      const sizeFound = availableSizes.find(
        size => size.sizeType.name === sizeName,
      );

      if (!sizeFound) return prev;

      const updatedSizes = [...availableSizes].map(size => ({
        ...size,
        selected: size.sizeType.name === sizeFound.sizeType.name,
      }));

      return {
        ...prev,
        item: {
          ...prev.item,
          availableSizes: updatedSizes,
        },
      };
    });
  };

  return {
    handleSelectSize,
  };
};
