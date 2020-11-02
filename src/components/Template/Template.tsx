/* eslint-disable react/no-danger */
import React from 'react';

import { Title } from '@/components/common';
import { REACT_APP_PLACEHOLDER, UC_GLOBALS_ID } from '@/constants';

interface TemplateProps {
  analyticsUrl?: string;
  assets: Record<string, string>;
  ucGlobals: string;
  isLocal: boolean;
}

/* istanbul ignore next */
function Template({ assets, analyticsUrl = '', isLocal, ucGlobals }: TemplateProps): JSX.Element {
  return (
    <html lang="en-US">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {analyticsUrl && <script src={analyticsUrl} />}
        <link rel="stylesheet" href="/ucfe-assets/normalize.css/8/normalize.min.css" />
        <link rel="stylesheet" href="/ucfe-assets/util-classes.css/2/util-classes.min.css" />
        <link rel="stylesheet" href="/ucfe-assets/fonts/3/fonts.min.css" />
        <link rel="stylesheet" href="/ucfe-assets/cx/2/cx.min.css" />
        <title>{isLocal && '[local] '}Video Generator</title>
      </head>
      <body className="uc-appBody">
        <div className="uc-appContainer">
          <script
            id={UC_GLOBALS_ID}
            dangerouslySetInnerHTML={{ __html: ucGlobals }}
            type="application/json"
          />
          <Title />
          <div id="root" css={{ width: '100%' }}>
            {REACT_APP_PLACEHOLDER}
          </div>
          <div id="portal-root" />
        </div>
        {assets['vendor.js'] && <script type="text/javascript" src={assets['vendor.js']} />}
        {assets['client.js'] && <script type="text/javascript" src={assets['client.js']} />}
      </body>
    </html>
  );
}

export { Template };
