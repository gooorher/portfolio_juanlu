import styled from "styled-components";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import SocialLinks from "../components/SocialLinks";
import Button from "../components/Button";

const StyledHeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 70vh;
  padding-top: 0px;
  padding-bottom: 60px;
  margin-bottom: -20px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at 20% 50%,
      rgba(100, 255, 218, 0.05) 0%,
      transparent 50%
    );
    animation: float 20s ease-in-out infinite;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    top: -30%;
    right: -30%;
    width: 150%;
    height: 150%;
    background: radial-gradient(
      circle at 80% 20%,
      rgba(32, 201, 151, 0.03) 0%,
      transparent 50%
    );
    animation: float-reverse 25s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
    33% {
      transform: translate(30px, -30px) rotate(120deg);
    }
    66% {
      transform: translate(-20px, 20px) rotate(240deg);
    }
  }

  @keyframes float-reverse {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
    33% {
      transform: translate(-30px, 30px) rotate(-120deg);
    }
    66% {
      transform: translate(20px, -20px) rotate(-240deg);
    }
  }
`;

const StyledIntro = styled(motion.h1)`
  color: var(--green);
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 400;
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  position: relative;
  z-index: 1;
`;

const StyledName = styled(motion.h2)`
  font-size: clamp(40px, 8vw, ${({ theme }) => theme.fontSizes.title});
  line-height: 1.1;
  margin: 0;
  background: var(--green-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;

  &::before {
    content: attr(data-text);
    position: absolute;
    top: 2px;
    left: 2px;
    z-index: -1;
    background: var(--background-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: blur(3px);
    opacity: 0.5;
  }
`;

const StyledTitle = styled(motion.h3)`
  font-size: clamp(40px, 8vw, ${({ theme }) => theme.fontSizes.title});
  line-height: 1.1;
  color: var(--slate);
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  position: relative;
  z-index: 1;
`;

const StyledDescription = styled(motion.p)`
  max-width: 540px;
  margin: 20px 0 0;
  position: relative;
  z-index: 1;
  background: var(--glassmorphism-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glassmorphism-border);
  border-radius: 12px;
  padding: 20px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const StyledButtonContainer = styled(motion.div)`
  margin-top: 40px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-top: 32px;

    button {
      width: 100%;
    }
  }
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

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.6,
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
        <StyledIntro variants={itemVariants}>{t("hero.greeting")}</StyledIntro>

        <StyledName variants={itemVariants} data-text="Juanlu Gordillo">
          Juanlu Gordillo
        </StyledName>

        <StyledTitle variants={itemVariants}>{t("hero.role")}</StyledTitle>

        <StyledDescription variants={itemVariants}>
          {t("hero.description")}
        </StyledDescription>
        <SocialLinks />

        <StyledButtonContainer variants={buttonVariants}>
          <Button
            variant="primary"
            size="large"
            onClick={() => {
              const element = document.getElementById("contact");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("hero.contactButton") || "Contact Me"}
          </Button>
          <Button
            variant="secondary"
            size="large"
            onClick={() => {
              const element = document.getElementById("work");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("hero.projectsButton") || "View Projects"}
          </Button>
        </StyledButtonContainer>
      </motion.div>
    </StyledHeroSection>
  );
};

export default Hero;
