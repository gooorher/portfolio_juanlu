import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

const StyledImageContainer = styled.div<{ $loaded: boolean }>`
  position: relative;
  overflow: hidden;
  background: var(--light-navy);
  border-radius: 8px;
  opacity: ${props => props.$loaded ? 1 : 0.7};
  transition: opacity 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      var(--light-navy) 0px,
      rgba(100, 255, 218, 0.1) 40px,
      var(--light-navy) 80px
    );
    background-size: 200px 100%;
    animation: shimmer 1.5s ease-in-out infinite;
    opacity: ${props => props.$loaded ? 0 : 1};
    transition: opacity 0.3s ease;
  }

  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
`;

const StyledImage = styled.img<{ $loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => props.$loaded ? 1 : 0};
  transition: opacity 0.3s ease;
  transform: ${props => props.$loaded ? 'scale(1)' : 'scale(1.05)'};
`;

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzExMjI0MCIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSIjODg5MmIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TG9hZGluZy4uLjwvdGV4dD4KPC9zdmc+',
  className,
  style
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const getImageSrc = () => {
    if (hasError) {
      return placeholder;
    }

    // Intentar cargar WebP primero, fallback a JPG/PNG
    if (src.includes('.')) {
      const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      return webpSrc;
    }

    return src;
  };

  return (
    <StyledImageContainer ref={imgRef} $loaded={isLoaded} className={className} style={style}>
      {isInView && (
        <picture>
          <source
            srcSet={src.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
            type="image/webp"
          />
          <source
            srcSet={src}
            type={`image/${src.split('.').pop()?.toLowerCase()}`}
          />
          <StyledImage
            src={getImageSrc()}
            alt={alt}
            $loaded={isLoaded}
            onLoad={handleLoad}
            onError={handleError}
          />
        </picture>
      )}
    </StyledImageContainer>
  );
};

export default LazyImage;
