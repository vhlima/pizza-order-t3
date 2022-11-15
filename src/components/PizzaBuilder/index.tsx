import type { PropsWithChildren } from 'react';

import {
  PizzaBuilderContext,
  PizzaBuilderProvider,
} from '../../hooks/usePizzaBuilderModal';

import PizzaBuilderModal from './components/PizzaBuilderModal';

const PizzaBuilder: React.FC<PropsWithChildren> = ({ children }) => (
  <PizzaBuilderProvider>
    <PizzaBuilderContext.Consumer>
      {({ isModalOpen, closeModal }) => (
        <>
          {isModalOpen && <PizzaBuilderModal onClose={closeModal} />}

          {children}
        </>
      )}
    </PizzaBuilderContext.Consumer>
  </PizzaBuilderProvider>
);

export default PizzaBuilder;
