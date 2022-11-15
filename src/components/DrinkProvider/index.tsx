import type { PropsWithChildren } from 'react';

import {
  DrinkContext,
  DrinkProvider as DrinkContextProvider,
} from '../../hooks/useDrinkModal';

import DrinkModal from './components/DrinkModal';

const DrinkProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <DrinkContextProvider>
    <DrinkContext.Consumer>
      {({ drinkInfo, closeModal }) => (
        <>
          {Object.keys(drinkInfo).length > 0 && (
            <DrinkModal onClose={closeModal} />
          )}

          {children}
        </>
      )}
    </DrinkContext.Consumer>
  </DrinkContextProvider>
);

export default DrinkProvider;
