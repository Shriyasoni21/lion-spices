import React from 'react';
import ImageWithFallback from './ImageWithFallback';

export default function ProductImage({ src, alt, size = 'featured', wrapperClass = '', imgClass = '' }) {
  // Use the global product-image-container for consistent sizing (height:220px)
  return (
    <div className={`${wrapperClass || 'product-image-container'}`}>
      <ImageWithFallback
        src={src}
        alt={alt}
        className={`product-image ${imgClass}`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
