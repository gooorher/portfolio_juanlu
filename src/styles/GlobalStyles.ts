import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';

const GlobalStyles = createGlobalStyle<{ theme?: Theme }>`
  /* CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Custom Properties */
  :root {
    --background: ${({ theme }) => theme.colors.background};
    --light-navy: ${({ theme }) => theme.colors.lightNavy};
    --lightest-navy: ${({ theme }) => theme.colors.lightestNavy};
    --slate: ${({ theme }) => theme.colors.slate};
    --light-slate: ${({ theme }) => theme.colors.lightSlate};
    --lightest-slate: ${({ theme }) => theme.colors.lightestSlate};
    --white: ${({ theme }) => theme.colors.white};
    --green: ${({ theme }) => theme.colors.green};
    --nav-height: ${({ theme }) => theme.navHeight};
    --hamburger-width: ${({ theme }) => theme.hamburgerWidth};
    --transition: ${({ theme }) => theme.transitions.default};
  }

  html {
    scroll-behavior: smooth;
    box-sizing: border-box;
    width: 100%;
    scroll-padding-top: 100px;
  }

  /* Scrollbar Styles */
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--light-navy) var(--background);
  }

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: var(--background);
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--light-navy);
    border: 3px solid var(--background);
    border-radius: 10px;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--background);
    color: var(--slate);
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: 1.5;
    transition: background-color 0.5s ease;

    &.blur {
      overflow: hidden;

      #root > * {
        filter: blur(5px) brightness(0.7);
        transition: var(--transition);
        pointer-events: none;
        user-select: none;
      }
    }
  }

  main {
    margin: 0 auto;
    width: 100%;
    max-width: ${({ theme }) => theme.maxWidth};
    min-height: 100vh;
    padding: 0 ${({ theme }) => theme.spacing.lg};

    @media (max-width: 1080px) {
      padding: 0 ${({ theme }) => theme.spacing.md};
    }

    @media (max-width: 768px) {
      padding: 0 ${({ theme }) => theme.spacing.sm};
    }
  }

  section {
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacing.xxl} 0;
    max-width: 1000px;

    @media (max-width: 768px) {
      padding: ${({ theme }) => theme.spacing.xl} 0;
    }

    & + section {
      margin-top: ${({ theme }) => theme.spacing.xl};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--lightest-slate);
    font-weight: 600;
    line-height: 1.1;
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
    transition: color 0.5s ease;
  }

  h2 {
    font-size: clamp(26px, 5vw, ${({ theme }) => theme.fontSizes.heading});
    
    @media (max-width: 768px) {
      margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
    }
  }

  p {
    line-height: 1.5;
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
    transition: color 0.5s ease;
  }

  a {
    color: var(--green);
    text-decoration: none;
    transition: var(--transition);

    &:hover {
      color: var(--green);
    }
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
    transition: var(--transition);
  }

  img, svg {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  /* Remove animations for people who've turned them off */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Selection styles */
  ::selection {
    background-color: var(--lightest-navy);
    color: var(--lightest-slate);
  }

  /* Theme transition styles */
  *, *::before, *::after {
    transition-property: background-color, border-color, color, fill, stroke;
    transition-timing-function: ease;
    transition-duration: 0.5s;
  }
`;

export default GlobalStyles;