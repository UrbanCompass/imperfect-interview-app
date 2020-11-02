import React from 'react';
import { shallow } from 'enzyme';
import { render as renderRoot, cleanup, fireEvent } from '@testing-library/react';

import { Select } from './Select';

describe('Select', (): void => {
  let getByPlaceholderText, getByRole, getByText;
  const onChange = jest.fn();
  const clear = jest.fn();
  const props = {
    items: [
      { value: 'foo', id: 'foo' },
      { value: 'bar', id: 'bar' },
      { value: 'foobar', id: 'foobar' },
    ],
    selectedItems: [],
    labelText: 'my label',
    onChange,
    clear,
    inputId: 'my-id',
    fakeTopLevelProp: true,
    placeholder: 'enter',
  };
  const downshiftProps = { getLabelProps: jest.fn(), fakeDownshiftProp: true };

  let wrapper = shallow(<Select {...props} />);

  beforeEach((): void => {
    ({ getByPlaceholderText, getByText, getByRole } = renderRoot(<Select {...props} />));
    onChange.mockClear();
  });

  afterEach(cleanup);

  it('renders Downshift', (): void => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders closed downshift content', (): void => {
    const render = wrapper.prop('children');
    const output = render({ ...downshiftProps, isOpen: false });
    expect(output).toMatchSnapshot();
  });

  it('renders open downshift content', (): void => {
    const render = wrapper.prop('children');
    const output = render({ ...downshiftProps, isOpen: true });
    expect(output).toMatchSnapshot();
  });

  it('renders no dropdown', (): void => {
    wrapper = shallow(<Select {...props} hideDropdown={true} />);
    const render = wrapper.prop('children');
    const output = render({ ...downshiftProps });
    expect(output).toMatchSnapshot();
  });

  it('handles change', (): void => {
    const downshift = wrapper.find('Downshift');
    const change = downshift.prop('onChange');
    change();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('displays dropdown on input', (): void => {
    fireEvent.change(getByPlaceholderText('enter'), { target: { value: 'a' } });
    expect(getByText('bar')).toBeTruthy();
    expect(getByText('foobar')).toBeTruthy();
  });

  it('set input on select item in dropdown', (): void => {
    fireEvent.change(getByPlaceholderText('enter'), { target: { value: 'a' } });
    fireEvent.click(getByText('foobar'));
    expect(onChange).toHaveBeenCalled();
  });

  it('click on x button would call clear', (): void => {
    fireEvent.change(getByPlaceholderText('enter'), { target: { value: 'a' } });
    fireEvent.click(getByText('foobar'));
    fireEvent.click(getByRole('button'));
    expect(clear).toHaveBeenCalled();
  });

  it('renders FetchedDropdown if options given, and dropdown Open', (): void => {
    const fetchDataProps = {
      loadFn: (): void => {},
      makeLoadProps: (): void => {},
      transformToItems: (): void => {},
    };
    const shallowWrapper = shallow(<Select {...props} fetchDataProps={fetchDataProps} />);
    const render = shallowWrapper.prop('children');
    const output = render({ ...downshiftProps, isOpen: true });
    expect(output).toMatchSnapshot();
  });
});
