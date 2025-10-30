import styled from "styled-components";
import { motion } from "framer-motion";

const StyledCVButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  background: var(--glassmorphism-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glassmorphism-border);
  border-radius: 8px;
  color: var(--lightest-slate);
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: ${({ theme }) => theme.spacing.md};
  width: fit-content; // Asegura que no tome todo el ancho disponible

  &:hover {
    color: var(--green);
    border-color: var(--green);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(100, 255, 218, 0.1);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const CVButtons = ({ language = "es" }: { language?: "es" | "en" }) => {
  const cvConfig = {
    es: {
      text: "Descargar CV",
      url: "/assets/pdfs/CV_Español.pdf",
    },
    en: {
      text: "Download CV",
      url: "/assets/pdfs/CV_English.pdf",
    },
  };

  const currentCv = cvConfig[language];

  return (
    <StyledCVButton
      href={currentCv.url}
      target="_blank"
      rel="noopener noreferrer"
      download
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      {currentCv.text}
    </StyledCVButton>
  );
};

export default CVButtons;
