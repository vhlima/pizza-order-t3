import type { PropsWithChildren } from 'react';

import type { LinkProps as NextLinkProps } from 'next/link';

import NextLink from 'next/link';

export type LinkProps = Omit<NextLinkProps, 'passHref'>;

interface LinkInternalProps extends LinkProps {
  className?: string;
}

const Link: React.FC<PropsWithChildren<LinkInternalProps>> = ({
  className,
  children,
  ...rest
}) => (
  <NextLink {...rest} passHref legacyBehavior>
    <a className={className || undefined} href="dummy">
      {children}
    </a>
  </NextLink>
);

export default Link;
