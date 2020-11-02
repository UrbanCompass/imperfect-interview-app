import React from 'react';
import styled from '@emotion/styled';

import { APP_BASE_URL } from '@/constants';

import { Separator } from './Separator';

const AGENT_HOME_URL = '/app/home';

const Header = styled.header`
  background-color: var(--cx-color-background);
  border-bottom: 1px solid var(--cx-color-border);
  padding: 0 40px;
  position: fixed;
  top: 0;
  z-index: 1000;
`;
Header.displayName = 'Header';

export function Title(): JSX.Element {
  return (
    <Header className="cx-masthead cx-gridPadding">
      <a href={AGENT_HOME_URL} css={{ display: 'flex' }}>
        <svg viewBox="0 0 112 16" height="16" css={{ margin: '24px 0' }}>
          <title>Compass</title>
          <path d="M53,.457,45,11.314,37,.457V15h2V6.543l6,8.143,6-8.143V15h2ZM60,15H58V1h6.5a4.5,4.5,0,0,1,0,9H60Zm0-7h4.5a2.5,2.5,0,0,0,0-5H60Zm22.863,7h2.275L77.5.9,69.863,15h2.275l1.625-3h7.475Zm-8.018-5L77.5,5.1,80.155,10ZM97,11.085c0,2.371-2.175,4.16-5.06,4.16a6.494,6.494,0,0,1-4.878-2.355l1.41-1.375A4.494,4.494,0,0,0,91.94,13.29c1.8,0,3.06-.906,3.06-2.2,0-1.11-.756-1.856-2.31-2.283L91,8.42c-3.6-.884-3.6-3.043-3.6-3.753,0-2.232,1.8-3.732,4.485-3.732a6.1,6.1,0,0,1,4.581,2.05l-1.41,1.378a4.629,4.629,0,0,0-3.171-1.472c-1.579,0-2.485.647-2.485,1.777,0,.337.128,1.462,1.773,1.816l1.533.345C95.516,7.487,97,8.96,97,11.085Zm14,0c0,2.371-2.175,4.16-5.06,4.16a6.494,6.494,0,0,1-4.878-2.355l1.41-1.375a4.494,4.494,0,0,0,3.468,1.775c1.8,0,3.06-.906,3.06-2.2,0-1.11-.756-1.856-2.31-2.283L105,8.42c-3.6-.884-3.6-3.043-3.6-3.753,0-2.232,1.8-3.732,4.485-3.732a6.1,6.1,0,0,1,4.581,2.05l-1.41,1.378a4.629,4.629,0,0,0-3.171-1.472c-1.579,0-2.485.647-2.485,1.777,0,.337.128,1.462,1.773,1.816l1.533.345C109.516,7.487,111,8.96,111,11.085Zm-98.611.8h0a5.5,5.5,0,1,1,0-7.778h0l.354.354L14.157,3.05,13.8,2.7h0a7.5,7.5,0,1,0,0,10.607l0,0h0l.354-.353-1.414-1.415ZM25.5.5A7.5,7.5,0,1,0,33,8,7.5,7.5,0,0,0,25.5.5Zm0,13A5.5,5.5,0,1,1,31,8,5.5,5.5,0,0,1,25.5,13.5Zm3.207-7.293L27.293,4.793l-5,5,1.414,1.414Z" />
        </svg>
      </a>
      <Separator />
      <a href={APP_BASE_URL} css={{ color: 'inherit', textDecoration: 'none' }}>
        <h1 className="cx-masthead-title">Video Generator</h1>
      </a>
    </Header>
  );
}
