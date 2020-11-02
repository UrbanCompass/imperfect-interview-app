import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Context } from 'koa';

import { render } from './render';

jest.mock('react-dom/server', () => ({
  renderToStaticMarkup: jest.fn(() => 'initial-markup-REACT_APP_PLACEHOLDER-remaining-markup'),
  renderToString: jest.fn(() => 'react-app'),
}));

const ctx = {
  request: { url: `/app/tours/something` },
  response: {
    body: '',
  },
  state: {
    analyticsUrl: '/fake/analytics.js',
    assets: {
      fakeAsset: 'fake-asset',
    },
    ucGlobals: {},
  },
};

describe('render', () => {
  it('renders page', async () => {
    await render((ctx as unknown) as Context);
    expect(renderToString).toHaveBeenCalled();
    expect(renderToStaticMarkup).toHaveBeenCalled();
    expect(ctx.response.body).toEqual('<!doctype html>initial-markup-react-app-remaining-markup');
  });
});
