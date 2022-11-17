import type { PropsWithChildren } from 'react';

import clsx from 'clsx';

import Typography from '../Typography';

interface StepCardProps {
  className?: string;
  title: string;
  styleType?: 'primary' | 'secondary';
  padding?: boolean;
}

const StepCard: React.FC<PropsWithChildren<StepCardProps>> = ({
  className,
  title,
  styleType = 'primary',
  padding = true,
  children,
}) => (
  <div className="w-full overflow-hidden rounded-sm border border-grey">
    <header
      className={clsx('p-2', {
        'bg-blue-200': styleType === 'primary',
        'bg-grey-100': styleType === 'secondary',
      })}
    >
      <Typography
        className={clsx('uppercase font-bold', {
          'uppercase font-bold': styleType === 'primary',
          uppercase: styleType === 'secondary',
        })}
        component="h2"
        size={styleType === 'primary' ? 'md' : 'sm'}
        color={styleType === 'primary' ? 'secondary' : 'tertiary'}
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
