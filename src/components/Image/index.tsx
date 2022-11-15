import NextImage from 'next/image';

import type { ImageProps } from 'next/image';

const Image: React.FC<ImageProps> = ({ src, ...props }) =>
  !src ? (
    <h1>Image not found</h1>
  ) : (
    <NextImage
      src={src}
      width={700}
      height={475}
      sizes="100vw"
      style={{
        width: '100%',
        height: 'auto',
      }}
      {...props}
    />
  );

export default Image;
