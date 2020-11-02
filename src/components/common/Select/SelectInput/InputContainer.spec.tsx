import React, { useContext } from 'react';
import { mount, shallow } from 'enzyme';
import { mocked } from 'ts-jest/utils';

import { mockComponent } from '@helpers/mockComponent';
import { InputContainer, Input } from './InputContainer';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

jest.mock('@/components/common/Select', () => ({
  SelectContext: mockComponent('SelectContext'),
}));

test('Input', (): void => {
  expect(mount(<Input />)).toMatchSnapshot();
});

const onValueChange = jest.fn();

describe('InputContainer', (): void => {
  const getInputProps = jest.fn((val) => val);
  const toggleMenu = jest.fn();
  const ctx = {
    placeholder: 'my placeholder',
    getInputProps,
    inputId: 'my-id',
    toggleMenu,
    value: 'foo',
    onValueChange,
    isOpen: true,
  };
  let wrapper;

  describe('default', (): void => {
    beforeAll((): void => {
      mocked(useContext).mockReturnValue(ctx);
      wrapper = shallow(<InputContainer />);
    });

    afterEach(() => {
      toggleMenu.mockClear();
    });

    it('renders default', (): void => {
      expect(wrapper).toMatchSnapshot();
    });

    it('toggles Menu', (): void => {
      const dropdownMenu = wrapper.find({ id: 'my-id' });
      dropdownMenu.simulate('click');
      expect(toggleMenu).toHaveBeenCalledTimes(1);
    });

    it('onValueChange is called if value is set', () => {
      const onKeyDown = wrapper.find('Input').prop('onKeyDown');
      onKeyDown({ key: 'Enter' });
      expect(onValueChange).toHaveBeenCalled();
    });

    it('toggles menu to close on Enter', () => {
      const onKeyDown = wrapper.find('Input').prop('onKeyDown');
      onKeyDown({ key: 'Enter' });
      expect(onValueChange).toHaveBeenCalled();
    });
  });
});
