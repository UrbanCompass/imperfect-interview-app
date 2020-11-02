import React, { useContext } from 'react';
import { shallow } from 'enzyme';
import { mocked } from 'ts-jest/utils';

import { mockComponent } from '@helpers/mockComponent';
import { SelectInput } from './SelectInput';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));
jest.mock('../Select', () => ({
  SelectContext: mockComponent('SelectContext'),
}));
jest.mock('./Selectable', () => ({
  Selectable: mockComponent('Selectable'),
}));
jest.mock('./InputContainer', () => ({
  InputContainer: mockComponent('InputContainer'),
}));
jest.mock('../shared/ClearButton', () => ({
  ClearButton: mockComponent('ClearButton'),
}));

describe('SelectInput', (): void => {
  const clear = 'clearFnMock';
  const ctx = {
    placeholder: 'my placeholder',
    inputId: 'my-id',
    clear,
  };
  let wrapper;

  describe('default', (): void => {
    beforeAll((): void => {
      mocked(useContext).mockReturnValue(ctx);
      wrapper = shallow(<SelectInput />);
    });

    it('renders', (): void => {
      expect(wrapper.find('InputContainer').exists()).toBe(true);
      expect(wrapper.find('ClearButton').exists()).toBe(false);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('onlySelect', (): void => {
    beforeAll((): void => {
      mocked(useContext).mockReturnValue({ ...ctx, onlySelect: true });
      wrapper = shallow(<SelectInput />);
    });

    it('renders Selectable', (): void => {
      expect(wrapper.find('Selectable').exists()).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('item selected', (): void => {
    beforeAll((): void => {
      mocked(useContext).mockReturnValue({
        ...ctx,
        selectedItem: { value: 'something', id: 1 },
      });
      wrapper = shallow(<SelectInput />);
    });

    it('renders clear button', (): void => {
      expect(wrapper.find('ArrowButton').exists()).toBe(false);
      expect(wrapper.find('ClearButton').exists()).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
