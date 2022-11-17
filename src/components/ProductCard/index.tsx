import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

import Image from '../Image';

import Typography from '../Typography';

interface ProductCardProps {
  name: string;
  imageUrl: string;
  description?: string;
  onClick?: () => void;
}

const ProductCard: React.FC<PropsWithChildren<ProductCardProps>> = ({
  name,
  imageUrl,
  description,
  children,
  onClick,
}) => {
  const body = (
    <>
      <Image className="rounded-sm" src={imageUrl} alt={name} />

      <Typography
        className={clsx('font-bold mt-1', {
          'text-center': !description,
        })}
        component="span"
        color="primary"
      >
        {name}
      </Typography>

      {description && (
        <Typography component="p" size="xs">
          {description}
        </Typography>
      )}

      {children}
    </>
  );

  return (
    <li
      className={clsx({
        'flex flex-col': !onClick,
      })}
    >
      {!onClick ? (
        body
      ) : (
        <button className="flex flex-col" type="button" onClick={onClick}>
          {body}
        </button>
      )}
    </li>
  );
};

export default ProductCard;
