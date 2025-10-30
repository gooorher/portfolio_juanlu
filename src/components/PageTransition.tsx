import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const StyledPageTransition = styled.div<{ $direction: 'up' | 'down' | 'left' | 'right' }>`
  animation: ${slideIn} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;

  &.page-exit {
    animation: ${fadeOut} 0.3s ease-out forwards;
  }

  &.slide-up {
    animation: ${slideIn} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  &.slide-down {
    animation: ${slideIn} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    transform-origin: top center;
  }

  &.slide-left {
    animation: ${slideIn} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    transform-origin: right center;
  }

  &.slide-right {
    animation: ${slideIn} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    transform-origin: left center;
  }
`;

const StyledTransitionOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--background-gradient);
  z-index: 999;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.4s ease-in-out;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background: var(--green-gradient);
    border-radius: 50%;
    opacity: ${props => props.$visible ? 0.3 : 0};
    transform: translate(-50%, -50%) scale(${props => props.$visible ? 2 : 0});
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

interface PageTransitionProps {
  children: React.ReactNode;
  transitionKey?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

const PageTransition = ({
  children,
  transitionKey,
  direction = 'up',
  className = ''
}: PageTransitionProps) => {
  const transitionRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const element = transitionRef.current;
    if (!element) return;

    // Add entrance animation
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';

    // Trigger entrance animation
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    return () => {
      // Cleanup animations
      if (element) {
        element.style.transition = '';
      }
    };
  }, [transitionKey]);

  const handleTransitionStart = () => {
    setIsTransitioning(true);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <>
      <StyledTransitionOverlay $visible={isTransitioning} />
      <StyledPageTransition
        ref={transitionRef}
        className={`page-transition slide-${direction} ${className}`}
        $direction={direction}
        onAnimationStart={handleTransitionStart}
        onAnimationEnd={handleTransitionEnd}
      >
        {children}
      </StyledPageTransition>
    </>
  );
};

export default PageTransition;
