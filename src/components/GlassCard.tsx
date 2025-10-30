import styled from 'styled-components';

interface GlassCardProps {
  padding?: string;
  borderRadius?: string;
  maxWidth?: string;
  $blur?: boolean;
}

const GlassCard = styled.div<GlassCardProps>`
  background: var(--glassmorphism-bg);
  backdrop-filter: blur(${props => props.$blur ? '10px' : '6px'});
  -webkit-backdrop-filter: blur(${props => props.$blur ? '10px' : '6px'});
  border: 1px solid var(--glassmorphism-border);
  border-radius: ${props => props.borderRadius || '16px'};
  padding: ${props => props.padding || '24px'};
  max-width: ${props => props.maxWidth || 'none'};
  box-shadow:
    0 8px 32px var(--glassmorphism-blur),
    0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 12px 40px var(--glassmorphism-blur),
      0 6px 20px rgba(0, 0, 0, 0.15);
    border-color: var(--green);
  }
`;

export default GlassCard;
