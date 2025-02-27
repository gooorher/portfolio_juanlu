import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import SocialLinks from '../components/SocialLinks';

const StyledHeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 70vh;
  padding-top: 0px;
  padding-bottom: 0;
  margin-bottom: 0;
`;

const StyledIntro = styled(motion.h1)`
  color: var(--green);
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 400;
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`;

const StyledName = styled(motion.h2)`
  font-size: clamp(40px, 8vw, ${({ theme }) => theme.fontSizes.title});
  line-height: 1.1;
  margin: 0;
`;

const StyledTitle = styled(motion.h3)`
  font-size: clamp(40px, 8vw, ${({ theme }) => theme.fontSizes.title});
  line-height: 1.1;
  color: var(--slate);
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
`;

const StyledDescription = styled(motion.p)`
  max-width: 540px;
  margin: 20px 0 0;
`;

const Hero = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <StyledHeroSection>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <StyledIntro variants={itemVariants}>
          {t('hero.greeting')}
        </StyledIntro>

        <StyledName variants={itemVariants}>
          Juanlu Gordillo
        </StyledName>

        <StyledTitle variants={itemVariants}>
          {t('hero.role')}
        </StyledTitle>

        <StyledDescription variants={itemVariants}>
          {t('hero.description')}
        </StyledDescription>
        <SocialLinks />
      </motion.div>
    </StyledHeroSection>
  );
};

export default Hero;