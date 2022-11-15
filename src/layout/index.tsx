import type { PropsWithChildren } from 'react';

import { ShoppingCartProvider } from '../hooks/useShoppingCart';

import Navbar from './components/Navbar';

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <ShoppingCartProvider>
    <div className="relative" id="modalPortal" />

    <div className="relative w-screen h-screen overflow-y-auto bg-white-200">
      <Navbar />

      <div className="w-full h-full p-4">{children}</div>
    </div>
  </ShoppingCartProvider>
);

export default Layout;
