import styled from "styled-components";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../contexts/LanguageContext";
import TechnologyIcons from "../components/TechnologyIcons";

const StyledAboutSection = styled.section`
  max-width: 900px;
  width: 100%;
  overflow-x: hidden;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    max-width: 100vw;
    padding: 0 20px;
    width: 100%;
    min-width: 320px;
  }

  @media (max-width: 480px) {
    padding: 0 15px;
    min-width: 300px;
  }
`;

const StyledText = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
  position: relative;

  p {
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: calc(100vw - 40px);
    min-width: 280px;
  }

  @media (max-width: 480px) {
    max-width: calc(100vw - 30px);
    min-width: 270px;
  }
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 8px 0;
      width: 100%;
      max-width: 100%;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 6px 0;
      width: 100%;
      max-width: 100%;
    }

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: ${({ theme }) => theme.fonts.mono};
      font-size: ${({ theme }) => theme.fontSizes.sm};
      width: 100%;
      word-wrap: break-word;
      overflow-wrap: break-word;
      line-height: 1.4;

      @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
        margin-bottom: 8px;
        padding-left: 15px;
        width: calc(100% - 15px);
      }

      &:before {
        content: "▹";
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: ${({ theme }) => theme.fontSizes.sm};
        line-height: 12px;

        @media (max-width: 768px) {
          font-size: ${({ theme }) => theme.fontSizes.xs};
        }
      }
    }
  }

  .tech-section {
    margin-top: ${({ theme }) => theme.spacing.xl};

    .tech-title {
      color: var(--light-slate);
      font-size: ${({ theme }) => theme.fontSizes.sm};
      margin-bottom: ${({ theme }) => theme.spacing.md};
      line-height: 1.4;

      @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
        margin-bottom: ${({ theme }) => theme.spacing.sm};
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;
  margin: 30px auto 0;

  @media (min-width: 768px) {
    margin: 0;
  }
`;

const StyledAvatar = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: var(--green);

  &:hover,
  &:focus {
    background: transparent;
    outline: 0;
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 50px;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    width: 100%;
    max-width: calc(100vw - 40px);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
    width: 100%;
    max-width: calc(100vw - 30px);
  }
`;

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { t } = useLanguage();

  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const techVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
      },
    },
  };

  const aboutText = t("about.description");
  const paragraphs = Array.isArray(aboutText) ? aboutText : [aboutText];

  return (
    <StyledAboutSection id="about" ref={ref}>
      <motion.h2
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
      >
        {t("about.title")}
      </motion.h2>

      <StyledGrid>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
        >
          <StyledText>
            {paragraphs.map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))}

            <div className="tech-section">
              <div className="tech-title">
                {t("about.technologiesTitle") ||
                  "Tecnologías que he estado trabajando recientemente:"}
              </div>
              <motion.div
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={techVariants}
              >
                <TechnologyIcons showNames={true} />
              </motion.div>
            </div>
          </StyledText>
        </motion.div>

        <StyledPic>
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
          >
            <StyledAvatar>{/* Add your profile image here */}</StyledAvatar>
          </motion.div>
        </StyledPic>
      </StyledGrid>
    </StyledAboutSection>
  );
};

export default About;
