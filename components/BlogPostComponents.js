import styled from 'styled-components';
import theme from '../theme';

export const StyledLink = styled.a`
  text-decoration: ${({ underline = true }) =>
    underline ? 'underline' : 'none'};

  .dark & {
    color: ${theme.colors.lightAlternate};
  }

  .light & {
    color: ${theme.colors.darkAlternate};
  }
`;
