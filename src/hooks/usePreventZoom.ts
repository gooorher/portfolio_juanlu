import { useEffect } from 'react';

export const usePreventZoom = () => {
  useEffect(() => {
    // Prevent pinch-to-zoom
    const preventDefault = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    const preventDoubleTapZoom = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    // Prevent zoom with keyboard shortcuts
    const preventKeyboardZoom = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === '+' || e.key === '-' || e.key === '0' || e.key === '=')
      ) {
        e.preventDefault();
      }
    };

    // Reset viewport scale on orientation change
    const resetViewportScale = () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        const content = viewport.getAttribute('content');
        if (content) {
          viewport.setAttribute('content', content.replace(/maximum-scale=[^,]*/, 'maximum-scale=1.0'));
          setTimeout(() => {
            viewport.setAttribute('content', content);
          }, 100);
        }
      }
    };

    // Prevent zoom on wheel events with ctrl
    const preventWheelZoom = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    // Add event listeners
    document.addEventListener('touchstart', preventDefault, { passive: false });
    document.addEventListener('touchend', preventDoubleTapZoom, { passive: false });
    document.addEventListener('keydown', preventKeyboardZoom);
    document.addEventListener('wheel', preventWheelZoom, { passive: false });
    window.addEventListener('orientationchange', resetViewportScale);

    // Reset scale periodically (backup mechanism)
    const resetScaleInterval = setInterval(() => {
      const scale = window.visualViewport?.scale || 1;
      if (scale > 1.1) {
        resetViewportScale();
      }
    }, 1000);

    return () => {
      // Cleanup event listeners
      document.removeEventListener('touchstart', preventDefault);
      document.removeEventListener('touchend', preventDoubleTapZoom);
      document.removeEventListener('keydown', preventKeyboardZoom);
      document.removeEventListener('wheel', preventWheelZoom);
      window.removeEventListener('orientationchange', resetViewportScale);
      clearInterval(resetScaleInterval);
    };
  }, []);
};
