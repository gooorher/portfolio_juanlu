import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useScroll } from "framer-motion";
import useActiveSection from "../hooks/useActiveSection";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import ToggleButton from "./ToggleButton";

const StyledHeader = styled(motion.header)`
  position: fixed;
  top: 0;
  width: 100%;
  height: var(--nav-height);
  background: var(--glassmorphism-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--glassmorphism-border);
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    background: var(--glassmorphism-bg);
    border-bottom-color: var(--green);
  }
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const StyledLinks = styled.div<{ menuOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(75vw, 400px);
    flex-direction: column;
    justify-content: center;
    background-color: var(--light-navy);
    box-shadow: -10px 0px 30px -15px rgba(2, 12, 27, 0.7);
    padding: ${({ theme }) => theme.spacing.xl};
    transform: translateX(${(props) => (props.menuOpen ? "0" : "100%")});
    transition: transform 0.3s ease-in-out;
    gap: ${({ theme }) => theme.spacing.xl};
    z-index: 1001;
    will-change: transform;
  }
`;

const StyledNavLink = styled(motion.a)<{ $isActive?: boolean }>`
  color: ${(props) =>
    props.$isActive ? "var(--green)" : "var(--lightest-slate)"};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.spacing.xs};
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--green-gradient);
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateZ(0);
  }

  &:hover {
    color: var(--green);
    transform: translateY(-2px) rotateX(5deg);
    text-shadow: 0 5px 10px rgba(100, 255, 218, 0.3);

    &::before {
      width: 100%;
    }
  }

  &:active {
    transform: translateY(0) rotateX(0deg);
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.lg};

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const StyledButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StyledHamburger = styled.button<{ menuOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1002;
    margin-right: -15px;
    padding: 15px;
    border: 0;
    background-color: transparent;
    color: var(--green);
    text-transform: none;
    transition: transform 0.15s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }

  .ham-box {
    display: inline-block;
    position: relative;
    width: var(--hamburger-width);
    height: 24px;
  }

  .ham-box-inner {
    position: absolute;
    top: 50%;
    right: 0;
    width: var(--hamburger-width);
    height: 2px;
    border-radius: 4px;
    background-color: var(--green);
    transition-duration: 0.22s;
    transition-property: transform;
    transition-delay: ${(props) => (props.menuOpen ? "0.12s" : "0s")};
    transform: rotate(${(props) => (props.menuOpen ? "225deg" : "0deg")});
    transition-timing-function: cubic-bezier(
      ${(props) =>
        props.menuOpen ? "0.215, 0.61, 0.355, 1" : "0.55, 0.055, 0.675, 0.19"}
    );

    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      left: auto;
      right: 0;
      width: var(--hamburger-width);
      height: 2px;
      border-radius: 4px;
      background-color: var(--green);
      transition-timing-function: ease;
      transition-duration: 0.15s;
      transition-property: transform;
    }

    &:before {
      width: ${(props) => (props.menuOpen ? "100%" : "120%")};
      top: ${(props) => (props.menuOpen ? "0" : "-10px")};
      opacity: ${(props) => (props.menuOpen ? "0" : "1")};
      transition: ${(props) =>
        props.menuOpen
          ? "top 0.1s ease-out, opacity 0.1s ease-out 0.12s"
          : "top 0.1s ease-in 0.25s, opacity 0.1s ease-in"};
    }

    &:after {
      width: ${(props) => (props.menuOpen ? "100%" : "80%")};
      bottom: ${(props) => (props.menuOpen ? "0" : "-10px")};
      transform: rotate(${(props) => (props.menuOpen ? "-90deg" : "0")});
      transition: ${(props) =>
        props.menuOpen
          ? "bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s"
          : "bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)"};
    }
  }
`;

const StyledOverlay = styled(motion.div)<{ menuOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(10, 25, 47, 0.85);
    pointer-events: ${(props) => (props.menuOpen ? "auto" : "none")};
    opacity: ${(props) => (props.menuOpen ? 1 : 0)};
    transition: opacity 0.3s ease-in-out;
    z-index: 999;
    will-change: opacity;
  }
`;

const Nav = () => {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const activeSection = useActiveSection([
    "about",
    "experience",
    "education",
    "work",
    "contact",
  ]);
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const previous = scrollY.getPrevious();
      if (latest > (previous ?? 0) && latest > 50) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    });
  }, [scrollY]);

  // Handle scroll lock when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // Reset menu state on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const variants = {
    visible: { y: 0 },
    hidden: { y: "-100%" },
  };

  return (
    <StyledHeader
      variants={variants}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <StyledNav>
        <StyledLinks menuOpen={menuOpen}>
          <StyledNavLink
            href="#about"
            $isActive={activeSection === "about"}
            onClick={handleLinkClick}
          >
            {t("nav.about")}
          </StyledNavLink>
          <StyledNavLink
            href="#experience"
            $isActive={activeSection === "experience"}
            onClick={handleLinkClick}
          >
            {t("nav.experience")}
          </StyledNavLink>
          <StyledNavLink
            href="#education"
            $isActive={activeSection === "education"}
            onClick={handleLinkClick}
          >
            {t("nav.education")}
          </StyledNavLink>
          <StyledNavLink
            href="#work"
            $isActive={activeSection === "work"}
            onClick={handleLinkClick}
          >
            {t("nav.projects")}
          </StyledNavLink>
          <StyledNavLink
            href="#contact"
            $isActive={activeSection === "contact"}
            onClick={handleLinkClick}
          >
            {t("nav.contact")}
          </StyledNavLink>
        </StyledLinks>

        <StyledButtons>
          <ToggleButton
            isActive={isDarkMode}
            onClick={toggleTheme}
            ariaLabel="Toggle theme"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </ToggleButton>

          <ToggleButton
            isActive={language === "en"}
            onClick={toggleLanguage}
            ariaLabel="Toggle language"
          >
            {language === "es" ? "🇺🇸" : "🇪🇸"}
          </ToggleButton>
        </StyledButtons>

        <StyledHamburger
          onClick={toggleMenu}
          menuOpen={menuOpen}
          aria-label="Menu"
        >
          <div className="ham-box">
            <div className="ham-box-inner" />
          </div>
        </StyledHamburger>

        <StyledOverlay menuOpen={menuOpen} onClick={toggleMenu} />
      </StyledNav>
    </StyledHeader>
  );
};

export default Nav;
