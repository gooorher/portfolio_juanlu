import { useState } from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';

const StyledEducationSection = styled.section`
  max-width: 900px;
`;

const StyledTabList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  overflow-x: auto;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const StyledTabButton = styled.button<{ $isActive: boolean }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: transparent;
  color: ${props => props.$isActive ? 'var(--green)' : 'var(--slate)'};
  border: none;
  border-bottom: 2px solid ${props => props.$isActive ? 'var(--green)' : 'var(--lightest-navy)'};
  min-width: 120px;
  text-align: left;
  transition: var(--transition);

  &:hover {
    color: var(--green);
  }
`;

const StyledTabContent = styled(motion.div)`
  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-weight: 500;

    .institution {
      color: var(--green);
    }
  }

  .range {
    color: var(--light-slate);
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  ul {
    padding: 0;
    margin: ${({ theme }) => theme.spacing.md} 0 0;
    list-style: none;

    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      color: var(--slate);
      transition: var(--transition);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
      }
    }
  }
`;

const Education = () => {
  const [ref, inView] = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  const [activeTab, setActiveTab] = useState(0);
  const { t } = useLanguage();

  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const educations = t('education.educations_data') as Array<{
    institution: string;
    degree: string;
    range: string;
    details: string[];
  }>;

  return (
    <StyledEducationSection id="education" ref={ref}>
      <motion.h2
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={variants}
      >
        {t('education.title')}
      </motion.h2>

      <div>
        <StyledTabList>
          {educations.map((edu, i) => (
            <StyledTabButton
              key={i}
              onClick={() => setActiveTab(i)}
              $isActive={activeTab === i}
            >
              {edu.institution}
            </StyledTabButton>
          ))}
        </StyledTabList>

        <StyledTabContent
          key={activeTab}
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          <h3>
            <span>{educations[activeTab].degree}</span>
            <span className="institution"> @ {educations[activeTab].institution}</span>
          </h3>
          <p className="range">{educations[activeTab].range}</p>
          <ul>
            {educations[activeTab].details.map((detail, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                {detail}
              </motion.li>
            ))}
          </ul>
        </StyledTabContent>
      </div>
    </StyledEducationSection>
  );
};

export default Education;