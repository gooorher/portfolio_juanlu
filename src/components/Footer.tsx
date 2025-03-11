import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
`;

const StyledCredit = styled.div`
  color: var(--light-slate);
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1;

  a {
    padding: 10px;
  }

  .github-stats {
    margin-top: 10px;
  }
`;

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <StyledFooter>
      <StyledCredit>
        <div>
          <span>{t('footer.designed')} </span>
          <a
            href="https://github.com/gooorher"
            target="_blank"
            rel="noopener noreferrer"
          >
            Juanlu Gordillo
          </a>
        </div>
        <div className="github-stats">
          {new Date().getFullYear()} © {t('footer.rights')}
        </div>
      </StyledCredit>
    </StyledFooter>
  );
};

export default Footer;