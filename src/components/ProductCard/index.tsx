import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

import Image from '../Image';

import Typography from '../Typography';

interface ProductCardProps {
  name: string;
  imageUrl: string;
  description?: string;
}

const ProductCard: React.FC<PropsWithChildren<ProductCardProps>> = ({
  name,
  imageUrl,
  description,
  children,
}) => (
  <li
    className={clsx({
      'flex flex-col': !!children,
    })}
  >
    <Image className="rounded-sm" src={imageUrl} alt={name} />

    <Typography className="font-bold mt-1" component="span" color="primary">
      {name}
    </Typography>

    {description && (
      <Typography component="p" size="xs">
        {description}
      </Typography>
    )}

    {children}
  </li>
);

export default ProductCard;
