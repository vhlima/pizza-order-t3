import type { ButtonHTMLAttributes } from 'react';

import clsx from 'clsx';

type ButtonStyleType = 'primary' | 'secondary' | 'tertiary';

export interface ButtonStyleProps {
  styleType: ButtonStyleType;
}

type ButtonProps = ButtonStyleProps & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ className, styleType, ...rest }) => (
  <button
    className={clsx(
      'p-1 font-bold rounded-sm',
      {
        'text-white bg-red': styleType === 'primary',
        'text-blue-100 border-2 border-blue-100': styleType === 'secondary',
        'text-grey-200 border-2 border-grey-200': styleType === 'tertiary',
      },
      className && className,
    )}
    type="button"
    {...rest}
  />
);

export default Button;
