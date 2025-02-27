import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const StyledTitle = styled.h2`
  font-size: clamp(40px, 5vw, 60px);
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
`;

const StyledContent = styled.div`
  p {
    margin: 0 0 ${({ theme }) => theme.spacing.xl} 0;
    color: var(--slate);
  }
`;

const StyledButton = styled.a`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl}`};
  border: 1px solid var(--green);
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: var(--green);
  background-color: transparent;

  &:hover,
  &:focus {
    background-color: var(--green);
    color: var(--background);
    outline: none;
  }
`;

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

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

  return (
    <StyledContactSection id="contact" ref={ref}>
      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={variants}
      >
        <StyledTitle>{t('contact.title')}</StyledTitle>
        
        <StyledContent>
          <p>{t('contact.description')}</p>

          <StyledButton
            href="mailto:tu.email@example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('contact.button')}
          </StyledButton>
        </StyledContent>
      </motion.div>
    </StyledContactSection>
  );
};

export default Contact;