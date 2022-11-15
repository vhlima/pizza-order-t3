import type { PropsWithChildren, ElementType, HtmlHTMLAttributes } from 'react';

import clsx from 'clsx';

interface TypographyProps
  extends Omit<HtmlHTMLAttributes<HTMLParagraphElement>, 'color'> {
  component: ElementType;

  color?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  size?: 'lg' | 'md' | 'sm';
}

const Typography: React.FC<PropsWithChildren<TypographyProps>> = ({
  className,
  component,
  color = 'tertiary',
  size = 'md',
  children,
  ...rest
}) => {
  const DynamicComponent = component;

  return (
    <DynamicComponent
      className={clsx(className && className, {
        'text-blue-100': color === 'primary',
        'text-white': color === 'secondary',
        'text-grey-200': color === 'tertiary',
        'text-red': color === 'quaternary',
        'text-sm': size === 'sm',
        'text-base': size === 'md',
        'text-2xl': size === 'lg',
      })}
      {...rest}
    >
      {children}
    </DynamicComponent>
  );
};

export default Typography;
