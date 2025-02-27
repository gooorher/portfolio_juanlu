import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import Nav from './Nav';
import Footer from './Footer';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const StyledMain = styled.main`
  margin: 0 auto;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
  padding-top: calc(var(--nav-height) + ${({ theme }) => theme.spacing.xl});
`;

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <GlobalStyles />
      <StyledContent>
        <Nav />
        <StyledMain>{children}</StyledMain>
        <Footer />
      </StyledContent>
    </>
  );
};

export default Layout;