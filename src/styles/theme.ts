export const lightTheme = {
  colors: {
    background: "#f8f9fa",
    backgroundGradient:
      "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)",
    glassmorphism: {
      background: "rgba(255, 255, 255, 0.7)",
      border: "rgba(255, 255, 255, 0.3)",
      blur: "rgba(255, 255, 255, 0.1)",
    },
    lightNavy: "#e9ecef",
    lightestNavy: "#dee2e6",
    slate: "#495057",
    lightSlate: "#6c757d",
    lightestSlate: "#343a40",
    white: "#212529",
    green: "#20c997",
    greenGradient: "linear-gradient(135deg, #20c997 0%, #17a2b8 100%)",
  },
  fonts: {
    primary:
      "Calibre, San Francisco, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Roboto, Helvetica Neue, Segoe UI, Arial, sans-serif",
    mono: "SF Mono, Fira Code, Fira Mono, Roboto Mono, Lucida Console, Monaco, monospace",
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    xxl: "22px",
    heading: "32px",
    title: "80px",
  },
  transitions: {
    default: "all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)",
  },
  borderRadius: "4px",
  navHeight: "100px",
  hamburgerWidth: "30px",
  spacing: {
    xxs: "4px",
    xs: "8px",
    sm: "12px",
    md: "20px",
    lg: "32px",
    xl: "48px",
    xxl: "64px",
  },
  maxWidth: "1000px",
} as const;

export const darkTheme = {
  ...lightTheme,
  colors: {
    background: "#0a192f",
    backgroundGradient:
      "linear-gradient(135deg, #0a192f 0%, #112240 50%, #233554 100%)",
    glassmorphism: {
      background: "rgba(10, 25, 47, 0.7)",
      border: "rgba(100, 255, 218, 0.1)",
      blur: "rgba(100, 255, 218, 0.05)",
    },
    lightNavy: "#112240",
    lightestNavy: "#233554",
    slate: "#8892b0",
    lightSlate: "#a8b2d1",
    lightestSlate: "#ccd6f6",
    white: "#e6f1ff",
    green: "#64ffda",
    greenGradient: "linear-gradient(135deg, #64ffda 0%, #48d1cc 100%)",
  },
} as const;

export type Theme = typeof lightTheme;
