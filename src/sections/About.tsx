import styled from "styled-components";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../contexts/LanguageContext";
import TechnologyIcons from "../components/TechnologyIcons";

const StyledAboutSection = styled.section`
  max-width: 900px;
`;

const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: ${({ theme }) => theme.fonts.mono};
      font-size: ${({ theme }) => theme.fontSizes.sm};

      &:before {
        content: "▹";
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: ${({ theme }) => theme.fontSizes.sm};
        line-height: 12px;
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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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
