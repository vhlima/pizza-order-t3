import type { PropsWithChildren } from 'react';

import {
  ProductContext,
  ProductModalProvider as ProductContextProvider,
} from '../../hooks/useProductModal';

import ProductModal from './components/ProductModal';

const ProductModalProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <ProductContextProvider>
    <ProductContext.Consumer>
      {({ productInfo, closeModal }) => (
        <>
          {Object.keys(productInfo).length > 0 && (
            <ProductModal onClose={closeModal} />
          )}

          {children}
        </>
      )}
    </ProductContext.Consumer>
  </ProductContextProvider>
);

export default ProductModalProvider;
