import styled from '@emotion/styled';

export const NavBar = styled.div`
  align-items: center;
  background-color: var(--cx-color-background);
  border-bottom: 1px solid var(--cx-color-border);
  box-shadow: 0 1px 3px var(--cx-color-dropShadow);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 12px 40px;
  position: fixed;
  top: 65px;
  width: 100%;
  z-index: 1000;
`;

NavBar.displayName = 'NavBar';
