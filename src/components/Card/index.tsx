import type { PropsWithChildren } from 'react';

import clsx from 'clsx';

interface CardProps {
  className?: string;
}

const Card: React.FC<PropsWithChildren<CardProps>> = ({
  className,
  children,
}) => (
  <div
    className={clsx(
      'rounded-md border border-grey bg-white',
      className && className,
    )}
  >
    {children}
  </div>
);

export default Card;
