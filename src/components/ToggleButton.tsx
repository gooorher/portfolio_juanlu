import styled from 'styled-components';

interface ToggleButtonProps {
  isActive: boolean;
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
}

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs};
  color: var(--green);
  background: transparent;
  border: none;
  position: relative;
  z-index: 10;
  
  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    color: var(--green);
  }
`;

const ToggleButton = ({ isActive, onClick, ariaLabel, children }: ToggleButtonProps) => {
  return (
    <StyledButton
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={isActive}
    >
      {children}
    </StyledButton>
  );
};

export default ToggleButton;