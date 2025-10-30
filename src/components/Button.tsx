import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

interface RippleProps {
  x: number;
  y: number;
  size: number;
}

const Ripple = styled.span<RippleProps>`
  position: absolute;
  border-radius: 50%;
  background: rgba(100, 255, 218, 0.3);
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: ripple-animation 0.6s ease-out;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;

  @keyframes ripple-animation {
    from {
      opacity: 1;
      transform: translate(-50%, -50%) scale(0);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -50%) scale(4);
    }
  }
`;

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  as?: "button" | "a";
}

const getButtonStyles = (variant: string, size: string) => {
  const variants = {
    primary: {
      background: "var(--green-gradient)",
      color: "var(--background)",
      border: "none",
    },
    secondary: {
      background: "transparent",
      color: "var(--green)",
      border: "1px solid var(--green)",
    },
    ghost: {
      background: "transparent",
      color: "var(--lightest-slate)",
      border: "1px solid var(--glassmorphism-border)",
    },
  };

  const sizes = {
    small: {
      padding: "8px 16px",
      fontSize: "14px",
    },
    medium: {
      padding: "12px 24px",
      fontSize: "16px",
    },
    large: {
      padding: "16px 32px",
      fontSize: "18px",
    },
  };

  return {
    ...variants[variant as keyof typeof variants],
    ...sizes[size as keyof typeof sizes],
  };
};

const StyledButton = styled.button<ButtonProps>`
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  border: 1px solid transparent;

  ${(props) => {
    const styles = getButtonStyles(
      props.variant || "primary",
      props.size || "medium",
    );
    return {
      background: styles.background,
      color: styles.color,
      border: styles.border,
      padding: styles.padding,
      fontSize: styles.fontSize,
    };
  }}

  &:hover {
    transform: translateY(-2px) rotateX(5deg);
    box-shadow:
      0 8px 25px rgba(100, 255, 218, 0.3),
      0 4px 12px rgba(0, 0, 0, 0.2);

    ${(props) =>
      props.variant === "primary" &&
      `
      box-shadow:
        0 8px 25px rgba(100, 255, 218, 0.4),
        0 4px 12px rgba(0, 0, 0, 0.2);
    `}

    ${(props) =>
      props.variant === "secondary" &&
      `
      background: var(--green);
      color: var(--background);
      border-color: var(--green);
    `}

    ${(props) =>
      props.variant === "ghost" &&
      `
      background: var(--glassmorphism-bg);
      backdrop-filter: blur(10px);
      border-color: var(--green);
      color: var(--green);
    `}
  }

  &:active {
    transform: translateY(0) rotateX(0deg);
    transition: all 0.1s ease;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  className,
  href,
  target,
  rel,
  type = "button",
  as = "button",
}) => {
  const [ripples, setRipples] = useState<RippleProps[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple: RippleProps = {
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple !== newRipple));
    }, 600);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(event);
    onClick?.();
  };

  const Component = as === "a" ? "a" : StyledButton;

  return (
    <Component
      ref={buttonRef}
      className={className}
      onClick={handleClick}
      disabled={disabled}
      href={href}
      target={target}
      rel={rel}
      type={type}
      variant={variant}
      size={size}
      as={as}
    >
      {children}
      {ripples.map((ripple, index) => (
        <Ripple key={index} x={ripple.x} y={ripple.y} size={ripple.size} />
      ))}
    </Component>
  );
};

export default Button;
