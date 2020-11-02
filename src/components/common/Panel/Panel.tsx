import React from 'react';
import styled from '@emotion/styled';

interface PanelProps {
  children: JSX.Element[] | JSX.Element;
  style?: React.CSSProperties;
}

const Container = styled.div`
  background-color: var(--cx-color-faintNeutral);
  height: 100%;
  overflow: scroll;
  padding-bottom: 100px;
  padding-top: 10px;
  position: fixed;
  text-align: center;
  top: 128px;
  width: 300px;
  z-index: 1;
`;
Container.displayName = 'Container';

export function Panel({ children, style }: PanelProps): JSX.Element {
  return <Container style={style}>{children}</Container>;
}
