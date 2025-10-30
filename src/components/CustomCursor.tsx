import { useEffect, useState, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClickable, setIsClickable] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't run on touch devices
    if ("ontouchstart" in window) {
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const clickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]');
      setIsClickable(clickable);
    };

    const hideMouse = () => setIsVisible(false);

    const handleClick = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = "translate(-50%, -50%) scale(0.8)";
        setTimeout(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform =
              "translate(-50%, -50%) scale(1)";
          }
        }, 150);
      }
    };

    // Add event listeners
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseleave", hideMouse);
    window.addEventListener("click", handleClick);

    // Hide default cursor ONLY on body, not on all elements
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseleave", hideMouse);
      window.removeEventListener("click", handleClick);
      document.body.style.cursor = "auto";
    };
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${position.x}px`;
      cursorRef.current.style.top = `${position.y}px`;
    }
  }, [position]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        width: isClickable ? "30px" : "20px",
        height: isClickable ? "30px" : "20px",
        border: "2px solid var(--green)",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none", // Important: don't interfere with clicks
        zIndex: 999999,
        transition: "width 0.15s, height 0.15s, transform 0.15s",
        backgroundColor: isClickable
          ? "rgba(100, 255, 218, 0.1)"
          : "transparent",
      }}
    >
      {/* Center dot */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "4px",
          height: "4px",
          backgroundColor: "var(--green)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default CustomCursor;
