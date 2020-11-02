import React, { useContext } from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import { mockComponent } from '@helpers/mockComponent';
import { ItemList } from './ItemList';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));
jest.mock('@/components/common', () => ({
  Icon: mockComponent('Icon'),
}));

describe('ItemList', (): void => {
  let wrapper;
  const itemProps = { itemProp: 'foo' };
  const menuProps = { menuProp: true };
  const itemsToDisplay = [
    { id: 'a', value: 'first', icon: 'icon', style: { color: 'red' } },
    { id: 'b', value: 'second' },
  ];
  const ctx = {
    getItemProps: jest.fn(() => itemProps),
    getMenuProps: jest.fn(() => menuProps),
    highlightedIndex: 1,
    inputId: 'my-Id',
  };

  it('renders default items', (): void => {
    mocked(useContext).mockReturnValueOnce(ctx);
    wrapper = shallow(<ItemList itemList={itemsToDisplay} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with inputIndex', (): void => {
    mocked(useContext).mockReturnValueOnce({ ...ctx, inputIndex: 1 });
    const { container } = render(<ItemList itemList={itemsToDisplay} />);
    expect(container).toMatchSnapshot();
  });
});
