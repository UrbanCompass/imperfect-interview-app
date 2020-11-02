import React, { useContext } from 'react';
import { shallow, mount } from 'enzyme';
import { mocked } from 'ts-jest/utils';

import { mockComponent } from '@helpers/mockComponent';
import { Items, Wrapper, ItemsContainer } from './Items';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));
jest.mock('./ItemList', () => ({
  ItemList: mockComponent('ItemList'),
}));

test('Wrapper', (): void => {
  expect(mount(<Wrapper>something</Wrapper>)).toMatchSnapshot();
});

test('ItemsContainer', (): void => {
  expect(mount(<ItemsContainer>something</ItemsContainer>)).toMatchSnapshot();
});

describe('Items', (): void => {
  let wrapper;
  const itemProps = { itemProp: true };
  const menuProps = { menuProp: true };
  const itemsToDisplay = [
    { id: 'a', value: 'first' },
    { id: 'b', value: 'second' },
  ];
  const ctx = {
    getItemProps: jest.fn(() => itemProps),
    getMenuProps: jest.fn(() => menuProps),
    highlightedIndex: 1,
    inputId: 'my-Id',
  };

  mocked(useContext).mockReturnValue(ctx);

  it('renders given items by edfault', (): void => {
    wrapper = shallow(<Items itemsToDisplay={itemsToDisplay} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading', (): void => {
    wrapper = shallow(<Items itemsToDisplay={[]} loading={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders load error', (): void => {
    wrapper = shallow(<Items itemsToDisplay={[]} loadError={true} />);
    expect(wrapper).toMatchSnapshot();
  });
});
