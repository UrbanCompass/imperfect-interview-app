import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { Context } from 'koa';

import { APP_BASE_URL, REACT_APP_PLACEHOLDER } from '@/constants';
import { App } from '@/components/App';
import { Template } from '@/components/Template';

// render will always the last middleware
export async function render({ request, response, state }: Context): Promise<void> {
  const app = renderToString(
    <StaticRouter basename={APP_BASE_URL} location={request.url} context={{}}>
      <App
        globals={{
          user: state.user,
          opty: state.opty,
        }}
      />
    </StaticRouter>
  );

  const page = renderToStaticMarkup(
    <Template
      assets={state.assets}
      ucGlobals={state.ucGlobals}
      analyticsUrl={state.analyticsUrl}
      isLocal={process.env.NODE_ENV === 'development'}
    />
  );

  response.body = `<!doctype html>${page.replace(REACT_APP_PLACEHOLDER, app)}`;
}
