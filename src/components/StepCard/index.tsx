import type { PropsWithChildren } from 'react';

import clsx from 'clsx';

import Typography from '../Typography';

interface StepCardProps {
  className?: string;
  title: string;
  padding?: boolean;
}

const StepCard: React.FC<PropsWithChildren<StepCardProps>> = ({
  className,
  title,
  padding = true,
  children,
}) => (
  <div className="w-full overflow-hidden rounded-sm border border-grey">
    <header className="bg-blue-200 p-2">
      <Typography
        className="font-bold uppercase"
        component="h2"
        color="secondary"
      >
        {title}
      </Typography>
    </header>

    <div className={clsx(padding && 'p-4', className && className)}>
      {children}
    </div>
  </div>
);

export default StepCard;
