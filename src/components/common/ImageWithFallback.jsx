import React, { useEffect, useState } from 'react';
import { DEFAULT_PRODUCT_IMAGE } from '../../utils/imageHelpers';

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = DEFAULT_PRODUCT_IMAGE,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    setHasError(false);
    setCurrentSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      onError={handleError}
    />
  );
}
