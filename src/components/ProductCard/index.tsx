import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

import Image from '../Image';

import Typography from '../Typography';

interface ProductCardProps {
  name: string;
  imageUrl: string;
  description?: string;
  small?: boolean;
  onClick?: () => void;
}

const ProductCard: React.FC<PropsWithChildren<ProductCardProps>> = ({
  name,
  imageUrl,
  description,
  small,
  children,
  onClick,
}) => {
  const body = (
    <>
      <Image className="rounded-sm" src={imageUrl} alt={name} />

      <Typography
        className={clsx('font-bold mt-1', {
          'text-center': !description,
          'text-left': description,
        })}
        component="span"
        color="primary"
        size={!small ? 'md' : 'sm'}
      >
        {name}
      </Typography>

      {description && (
        <Typography className="text-left" component="p" size="xs">
          {description}
        </Typography>
      )}

      {children}
    </>
  );

  return (
    <li className={!onClick ? 'flex flex-col' : undefined}>
      {!onClick ? (
        body
      ) : (
        <button
          className="flex flex-col w-full"
          type="button"
          onClick={onClick}
        >
          {body}
        </button>
      )}
    </li>
  );
};

export default ProductCard;
