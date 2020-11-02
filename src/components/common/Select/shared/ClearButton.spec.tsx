import React, { useContext } from 'react';
import { shallow } from 'enzyme';
import { mocked } from 'ts-jest/utils';

import { mockComponent } from '@helpers/mockComponent';
import { ClearButton } from './ClearButton';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));
jest.mock('../Select', () => ({
  SelectContext: mockComponent('SelectContext'),
}));
jest.mock('./InputButton', () => ({
  InputButton: mockComponent('InputButton'),
}));
jest.mock('@/components/common', () => ({
  ExitIcon: mockComponent('ExitIcon'),
}));

const clearSelection = jest.fn();
const clear = 'something';
const ctx = {
  clearSelection,
  inputId: 'my-id',
  clear,
};
mocked(useContext).mockReturnValue(ctx);

describe('ClearButton', (): void => {
  let wrapper;
  beforeAll((): void => {
    wrapper = shallow(<ClearButton />);
  });

  it('renders', (): void => {
    expect(wrapper).toMatchSnapshot();
  });

  it('responds to click', (): void => {
    wrapper.simulate('click');
    expect(clearSelection).toHaveBeenCalledTimes(1);
    expect(clearSelection).toHaveBeenCalledWith(clear);
  });
});
