import styled from 'styled-components';
import { motion } from 'framer-motion';

const SocialLinksContainer = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const StyledIcon = styled.img`
  width: 100%;
  height: 100%;
  filter: ${({ theme }) => theme.colors.background === '#0a192f'
    ? 'invert(70%) sepia(12%) saturate(410%) hue-rotate(183deg) brightness(92%) contrast(92%)'  // Light gray for dark theme
    : 'invert(35%) sepia(10%) saturate(694%) hue-rotate(182deg) brightness(96%) contrast(87%)'}; // Dark gray for light theme
  transition: ${({ theme }) => theme.transitions.default};
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-3px);
    ${StyledIcon} {
      filter: ${({ theme }) => theme.colors.background === '#0a192f'
        ? 'invert(85%) sepia(12%) saturate(410%) hue-rotate(183deg) brightness(102%) contrast(92%)'  // Lighter gray for dark theme
        : 'invert(20%) sepia(10%) saturate(694%) hue-rotate(182deg) brightness(96%) contrast(95%)'}; // Darker gray for light theme
    }
  }
`;

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'www.linkedin.com/in/jgordilloh',
    icon: '/linkedin.svg',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/gooorher',
    icon: '././github.svg',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/__jgordillo',
    icon: '/instagram.svg',
  },
  {
    name: 'Goodreads',
    url: 'https://www.goodreads.com/user/show/175064061',
    icon: '/goodreads.svg',
  },
  {
    name: 'Strava',
    url: 'https://strava.app.link/3tso5WhgoRb',
    icon: '/strava.svg',
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/user/juaaanlu',
    icon: '/spotify.svg',
  },
];

const SocialLinks = () => {
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
    <SocialLinksContainer variants={itemVariants}>
      {socialLinks.map(({ name, url, icon }) => (
        <SocialLink
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
        >
          <StyledIcon src={icon} alt={name} />
        </SocialLink>
      ))}
    </SocialLinksContainer>
  );
};

export default SocialLinks;