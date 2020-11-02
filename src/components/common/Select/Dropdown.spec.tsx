import React, { useContext, useMemo } from 'react';
import { shallow } from 'enzyme';
import { mocked } from 'ts-jest/utils';

import { mockComponent } from '@helpers/mockComponent';
import { Dropdown } from './Dropdown';
import { filterItems, filterOutSelectedItems } from './helpers';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
  useMemo: jest.fn(),
}));
jest.mock('./Select', () => ({
  SelectContext: mockComponent('SelectContext'),
}));
jest.mock('./helpers', () => ({
  filterItems: jest.fn(),
  filterOutSelectedItems: jest.fn(),
}));
jest.mock('./shared/Items', () => ({
  Items: mockComponent('Items'),
}));

const ctx = {
  items: [
    { id: 1, value: 'first' },
    { id: 2, value: 'second' },
  ],
  inputValue: 'my value',
};

describe('Dropdown', (): void => {
  describe('regular', (): void => {
    beforeAll((): void => {
      mocked(useContext).mockReturnValue({ ...ctx, selectedItem: {} });
    });

    beforeEach((): void => {
      mocked(filterItems).mockClear();
      mocked(filterOutSelectedItems).mockClear();
    });

    it('renders matched items', (): void => {
      mocked(useMemo)
        .mockImplementationOnce((fn) => {
          fn();
          return [{ value: 'my list' }];
        })
        .mockImplementationOnce(() => ctx.items);

      const wrapper = shallow(<Dropdown />);
      expect(filterItems).toHaveBeenCalledTimes(1);
      expect(filterOutSelectedItems).toHaveBeenCalledTimes(1);
      expect(wrapper.find('Items').exists()).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders default if no matched items', (): void => {
      mocked(useMemo)
        .mockImplementationOnce((fn) => {
          fn();
          return [];
        })
        .mockImplementationOnce(() => []);
      const wrapper = shallow(<Dropdown />);
      expect(filterItems).toHaveBeenCalledTimes(1);
      expect(filterOutSelectedItems).toHaveBeenCalledTimes(1);
      expect(wrapper.type()).toBe(null);
    });

    it('renders matched items with showAllItems', (): void => {
      mocked(useContext).mockReturnValueOnce({ ...ctx, selectedItem: {}, showAllItems: true });
      mocked(useMemo)
        .mockImplementationOnce((fn) => {
          fn();
          return [{ value: 'my list' }];
        })
        .mockImplementationOnce(() => ctx.items);

      const wrapper = shallow(<Dropdown />);
      expect(filterItems).toHaveBeenCalledTimes(1);
      expect(filterOutSelectedItems).toHaveBeenCalledTimes(1);
      expect(wrapper.find('Items').exists()).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('onlySelect', (): void => {
    describe('no selectedItems', (): void => {
      beforeAll((): void => {
        mocked(useContext).mockReturnValue({
          ...ctx,
          onlySelect: true,
          selectedItems: [],
        });
      });

      it('renders matched items', (): void => {
        mocked(useMemo)
          .mockImplementationOnce((fn) => fn)
          .mockImplementationOnce((fn) => {
            fn();
            return [];
          });
        const wrapper = shallow(<Dropdown />);
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('has selectedItem', (): void => {
      beforeAll((): void => {
        mocked(useContext).mockReturnValue({
          ...ctx,
          onlySelect: true,
          selectedItems: [{ id: 1, value: 'first' }],
        });
      });

      it('renders matched items', (): void => {
        mocked(useMemo)
          .mockImplementationOnce((fn) => fn)
          .mockImplementationOnce((fn) => {
            fn();
            return [{ id: 1, value: 'first' }];
          });
        const wrapper = shallow(<Dropdown />);
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
