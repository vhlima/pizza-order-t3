import type { PropsWithChildren } from 'react';

import clsx from 'clsx';

import { createPortal } from 'react-dom';

export interface ModalHandles {
  onClose: () => void;
}

interface ModalInternalProps extends Partial<ModalHandles> {
  className?: string;
  backdrop?: boolean;
  center?: boolean;
}

const PORTAL_ID = 'modalPortal';

const Modal: React.FC<PropsWithChildren<ModalInternalProps>> = ({
  className,
  backdrop,
  center,
  onClose,
  children,
}) => {
  const body = (
    <div
      className={clsx('absolute bg-white z-50', className && className, {
        'top-16 left-1/2 transform -translate-x-1/2': center,
      })}
      role="presentation"
      onClick={e => e.stopPropagation()}
    >
      {children}
    </div>
  );

  return createPortal(
    !backdrop ? (
      body
    ) : (
      <div
        className="w-screen h-screen absolute z-40 overflow-hidden bg-black bg-opacity-50"
        role="presentation"
        onClick={onClose}
      >
        {body}
      </div>
    ),
    document.getElementById(PORTAL_ID) || document.body,
  );
};

export default Modal;
