import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

interface SkeletonProps {
  width?: string;
  height?: string;
  margin?: string;
  borderRadius?: string;
  animation?: boolean;
}

const Skeleton = styled.div<SkeletonProps>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '20px'};
  margin: ${props => props.margin || '0'};
  border-radius: ${props => props.borderRadius || '4px'};
  background: linear-gradient(
    90deg,
    var(--light-navy) 0px,
    rgba(100, 255, 218, 0.1) 40px,
    var(--light-navy) 80px
  );
  background-size: 200px 100%;
  ${props => props.animation !== false && `
    animation: ${shimmer} 1.5s ease-in-out infinite;
  `}
`;

const SkeletonCard = styled.div`
  background: var(--glassmorphism-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glassmorphism-border);
  border-radius: 16px;
  padding: 24px;
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SkeletonCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SkeletonIcon = styled(Skeleton)`
  width: 48px;
  height: 48px;
  border-radius: 12px;
`;

const SkeletonTitle = styled(Skeleton)`
  flex: 1;
  height: 24px;
`;

const SkeletonDescription = styled(Skeleton)`
  height: 16px;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const SkeletonTech = styled(Skeleton)`
  height: 24px;
  width: 80px;
  &:not(:last-child) {
    margin-right: 8px;
  }
`;

const SkeletonFooter = styled.div`
  margin-top: auto;
  display: flex;
  gap: 12px;
`;

const ProjectSkeleton = () => {
  return (
    <SkeletonCard>
      <SkeletonCardHeader>
        <SkeletonIcon />
        <SkeletonTitle />
      </SkeletonCardHeader>

      <SkeletonDescription />
      <SkeletonDescription width="80%" />
      <SkeletonDescription width="60%" />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
        <SkeletonTech />
        <SkeletonTech />
        <SkeletonTech />
      </div>

      <SkeletonFooter>
        <Skeleton width="100px" height="32px" borderRadius="8px" />
        <Skeleton width="100px" height="32px" borderRadius="8px" />
      </SkeletonFooter>
    </SkeletonCard>
  );
};

export default ProjectSkeleton;
