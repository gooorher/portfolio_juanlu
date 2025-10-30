import styled from "styled-components";

const StyledTechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  max-width: 600px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(45px, 1fr));
    gap: ${({ theme }) => theme.spacing.sm};
    margin-top: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
    gap: ${({ theme }) => theme.spacing.xs};
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`;

const StyledTechItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;

  &:hover {
    transform: translateY(-5px) scale(1.1);

    .tech-icon {
      filter: brightness(1.2) drop-shadow(0 4px 8px rgba(100, 255, 218, 0.3));
    }

    .tech-name {
      color: var(--green);
      opacity: 1;
    }
  }
`;

const StyledTechIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  filter: grayscale(20%);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 20px;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 18px;
  }
`;

const StyledTechName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: ${({ theme }) => theme.fonts.mono};
  color: var(--light-slate);
  opacity: 0.8;
  transition: all 0.3s ease;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 10px;
  }

  @media (max-width: 480px) {
    font-size: 9px;
  }
`;

interface Technology {
  name: string;
  icon: string;
  color: string;
}

const technologies: Technology[] = [
  { name: "JavaScript", icon: "🟨", color: "#F7DF1E" },
  { name: "TypeScript", icon: "🔷", color: "#3178C6" },
  { name: "React", icon: "⚛️", color: "#61DAFB" },
  { name: "Node.js", icon: "🟢", color: "#339933" },
  { name: "Python", icon: "🐍", color: "#3776AB" },
  { name: "Bash", icon: "🖥️", color: "#4EAA25" },
  { name: "AWS", icon: "☁️", color: "#FF9900" },
  { name: "HTML5", icon: "📄", color: "#E34F26" },
  { name: "CSS3", icon: "🎨", color: "#1572B6" },
  { name: "Git", icon: "📦", color: "#F05032" },
  { name: "Docker", icon: "🐳", color: "#2496ED" },
  { name: "MongoDB", icon: "🍃", color: "#47A248" },
];

interface TechnologyIconsProps {
  showNames?: boolean;
  gridColumns?: string;
}

const TechnologyIcons = ({
  showNames = true,
  gridColumns,
}: TechnologyIconsProps) => {
  return (
    <StyledTechGrid
      style={{
        gridTemplateColumns:
          gridColumns || "repeat(auto-fit, minmax(60px, 1fr))",
      }}
    >
      {technologies.map((tech) => (
        <StyledTechItem key={tech.name} title={tech.name}>
          <StyledTechIcon
            className="tech-icon"
            style={{
              fontSize: tech.name === "React" ? "32px" : "28px",
              filter: `drop-shadow(0 2px 4px ${tech.color}20)`,
            }}
          >
            {tech.icon}
          </StyledTechIcon>
          {showNames && (
            <StyledTechName className="tech-name">{tech.name}</StyledTechName>
          )}
        </StyledTechItem>
      ))}
    </StyledTechGrid>
  );
};

export default TechnologyIcons;
