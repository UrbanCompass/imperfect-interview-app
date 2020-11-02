import React from 'react';
import { render, cleanup } from '@testing-library/react';
import debounce from 'lodash/debounce';
import { mocked } from 'ts-jest/utils';

import { ShowData } from '@helpers/ShowData';
import { useTypeaheadLoad } from './useTypeaheadLoad';
import { useLoad } from './useLoad';

jest.mock('./useLoad', () => ({
  useLoad: jest.fn(),
}));
jest.mock('lodash/debounce', () => jest.fn());

const debouncedLoad = jest.fn();
mocked(debounce).mockImplementation((fn) => {
  fn();
  return debouncedLoad;
});

describe('useTypeaheadLoad', (): void => {
  let rerender, getByTestId, props;
  const inputValue = 'My input';
  const loadFn = jest.fn();
  const makeLoadProps = jest.fn((val) => ({ option: `loadProps from ${val}` }));
  const fromLoad = {
    loading: false,
    loadError: false,
    loaded: false,
    data: { fakeData: true },
    fetchData: jest.fn(),
  };

  mocked(useLoad).mockReturnValue(fromLoad);
  afterEach(cleanup);

  function HookTester(p) {
    // eslint-disable-next-line
    const result = useTypeaheadLoad(p);
    return <ShowData {...result} />;
  }

  it('does not fetch data with no input', (): void => {
    props = { inputValue: '', loadFn, makeLoadProps };
    ({ rerender, getByTestId } = render(<HookTester {...props} />));
    expect(debouncedLoad).not.toHaveBeenCalled();
    expect(getByTestId('load-status')).toMatchSnapshot();
    expect(getByTestId('resolved-data')).toMatchSnapshot();
  });

  it('does not fetch if only one character entered', (): void => {
    props = { inputValue: 'a', loadFn, makeLoadProps };
    rerender(<HookTester {...props} />);
    expect(debouncedLoad).not.toHaveBeenCalled();
  });

  it('fetches data if input is available', (): void => {
    props = { inputValue, loadFn, makeLoadProps };
    rerender(<HookTester {...props} />);
    expect(debouncedLoad).toHaveBeenCalledTimes(1);
    expect(debouncedLoad).toHaveBeenCalledWith(inputValue);
  });
});
