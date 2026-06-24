import React, { useEffect, useState } from 'react';

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/images/products/lion-spices-trio.png',
  className = '',
  loading = 'lazy',
  decoding = 'async',
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
