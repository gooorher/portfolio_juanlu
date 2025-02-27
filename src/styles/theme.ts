export const lightTheme = {
  colors: {
    background: '#f8f9fa',
    lightNavy: '#e9ecef',
    lightestNavy: '#dee2e6',
    slate: '#495057',
    lightSlate: '#6c757d',
    lightestSlate: '#343a40',
    white: '#212529',
    green: '#20c997',
  },
  fonts: {
    primary: 'Calibre, San Francisco, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Roboto, Helvetica Neue, Segoe UI, Arial, sans-serif',
    mono: 'SF Mono, Fira Code, Fira Mono, Roboto Mono, Lucida Console, Monaco, monospace',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '22px',
    heading: '32px',
    title: '80px',
  },
  transitions: {
    default: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
  },
  borderRadius: '4px',
  navHeight: '100px',
  hamburgerWidth: '30px',
  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '20px',
    lg: '32px',
    xl: '48px',
    xxl: '64px',
  },
  maxWidth: '1000px',
} as const;

export const darkTheme = {
  ...lightTheme,
  colors: {
    background: '#0a192f',
    lightNavy: '#112240',
    lightestNavy: '#233554',
    slate: '#8892b0',
    lightSlate: '#a8b2d1',
    lightestSlate: '#ccd6f6',
    white: '#e6f1ff',
    green: '#64ffda',
  },
} as const;

export type Theme = typeof lightTheme;