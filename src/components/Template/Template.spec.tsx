import React from 'react';
import { shallow } from 'enzyme';

import { Template } from './Template';

describe('Template', (): void => {
  const props = {
    analyticsUrl: 'http://my.analytics',
    ucGlobals: 'something',
    assets: {
      'vendor.js': '/path/to/vendor.js',
      'client.js': '/path/to/client.js',
    },
    isLocal: false,
  };

  it('renders', (): void => {
    expect(shallow(<Template {...props} />)).toMatchSnapshot();
  });
});
