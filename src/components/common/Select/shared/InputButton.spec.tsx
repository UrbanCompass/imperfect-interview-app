import React from 'react';
import { mount } from 'enzyme';

import { InputButton } from './InputButton';

test('InputButton', (): void => {
  expect(mount(<InputButton>my content</InputButton>)).toMatchSnapshot();
});
