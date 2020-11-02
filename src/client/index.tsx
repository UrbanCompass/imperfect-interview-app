import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@/components/App';
import { APP_BASE_URL } from '@/constants';
import { getGlobals } from '@/utils/getGlobals';

ReactDOM.hydrate(
  <BrowserRouter basename={APP_BASE_URL}>
    <App globals={getGlobals()} />
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
