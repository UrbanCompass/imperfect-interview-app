import React, { useContext, useMemo } from 'react';
import { shallow } from 'enzyme';
import { mocked } from 'ts-jest/utils';

import { mockComponent } from '@helpers/mockComponent';
import { useTypeaheadLoad } from '@/hooks/data/useTypeaheadLoad';
import { FetchDataDropdown } from './FetchDataDropdown';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
  useMemo: jest.fn(),
}));
jest.mock('./Select', () => ({
  SelectContext: mockComponent('SelectContext'),
}));
jest.mock('./shared/Items', () => ({
  Items: mockComponent('Items'),
}));
jest.mock('./helpers', () => ({
  filterItems: jest.fn(),
  filterOutSelectedItems: jest.fn(),
}));
jest.mock('@/hooks/data/useTypeaheadLoad', () => ({
  useTypeaheadLoad: jest.fn(),
}));

const item = {
  value: 'foo',
  id: 'foo',
};

describe('FetchDataDropdown', (): void => {
  let wrapper;
  const inputValue = 'my input';
  const transformToItems = jest.fn();
  const loadFn = jest.fn();
  const makeLoadProps = jest.fn();
  const fetchDataProps = { transformToItems, loadFn, makeLoadProps };
  mocked(useContext).mockReturnValue({ inputValue, fetchDataProps, selectedItem: {} });

  afterEach((): void => {
    transformToItems.mockClear();
    mocked(useMemo).mockClear();
  });

  it('renders default', (): void => {
    mocked(useTypeaheadLoad).mockReturnValueOnce({
      loaded: false,
      loading: true,
      loadError: false,
      data: {},
    });
    mocked(useMemo).mockImplementationOnce((fn) => {
      fn();
    });
    wrapper = shallow(<FetchDataDropdown />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders null if no input value', () => {
    mocked(useContext).mockReturnValueOnce({
      inputValue: '',
      fetchDataProps,
      selectedItems: [item],
    });
    mocked(useTypeaheadLoad).mockReturnValueOnce({
      loaded: false,
      loading: true,
      loadError: false,
      data: {},
    });
    mocked(useMemo).mockImplementationOnce((fn) => {
      fn();
    });
    wrapper = shallow(<FetchDataDropdown />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders fetched (loaded) items', (): void => {
    const fakeData = [{ fakeData: true }];
    mocked(useTypeaheadLoad).mockReturnValueOnce({
      loaded: true,
      loading: false,
      loadError: false,
      data: fakeData,
    });
    transformToItems.mockReturnValueOnce(fakeData);
    mocked(useMemo).mockImplementationOnce((fn) => {
      fn();
      return fakeData;
    });
    wrapper = shallow(<FetchDataDropdown />);
    expect(transformToItems).toHaveBeenCalledTimes(1);
    expect(transformToItems).toHaveBeenCalledWith(fakeData);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders fetched (loaded) sections', (): void => {
    const fakeData = [{ title: 'has sections', listOfItems: [{ id: 'a', value: 'A' }] }];
    mocked(useTypeaheadLoad).mockReturnValueOnce({
      loaded: true,
      loading: false,
      loadError: false,
      data: fakeData,
    });
    transformToItems.mockReturnValueOnce(fakeData);
    mocked(useMemo).mockImplementationOnce((fn) => {
      fn();
      return fakeData;
    });
    wrapper = shallow(<FetchDataDropdown />);
    expect(transformToItems).toHaveBeenCalledTimes(1);
    expect(transformToItems).toHaveBeenCalledWith(fakeData);
    expect(wrapper).toMatchSnapshot();
  });
});
