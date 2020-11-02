import React, { useContext } from 'react';
import { shallow } from 'enzyme';
import { mocked } from 'ts-jest/utils';

import { mockComponent } from '@helpers/mockComponent';
import { Selectable } from './Selectable';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));
jest.mock('../Select', () => ({
  SelectContext: mockComponent('SelectContext'),
}));
jest.mock('@/components/common', () => ({
  Icon: mockComponent('Icon'),
}));

describe('Selectable', (): void => {
  const getToggleButtonProps = jest.fn((val) => val);
  const ctx = {
    placeholder: 'my placeholder',
    getToggleButtonProps,
    inputId: 'my-id',
  };
  let wrapper;

  describe('default', (): void => {
    it('renders default', (): void => {
      mocked(useContext).mockReturnValue(ctx);
      wrapper = shallow(<Selectable />);

      expect(wrapper).toMatchSnapshot();
    });

    it('renders selected item', (): void => {
      mocked(useContext).mockReturnValue({
        ...ctx,
        selectedItem: { value: 'something' },
      });
      wrapper = shallow(<Selectable />);

      expect(wrapper.find('span').exists()).toBe(false);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
