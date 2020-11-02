import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';

import { useOutsideClick } from './useOutsideClick';

// eslint-disable-next-line react/prop-types
function HookTester({ node, predicate, cb }): JSX.Element {
  const fn = useOutsideClick({ ref: node, predicate, cb });
  function handleClick() {
    fn();
  }
  // eslint-disable-next-line
  return <button onClick={handleClick} data-testid="test-elem" ref={node} />;
}

describe('useOutsideClick', () => {
  let rerender;
  const contains = jest.fn(() => true);
  const node = { current: null, contains };
  const cb = jest.fn();
  delete document.addEventListener;
  delete document.removeEventListener;
  const addEventListener = jest.fn();
  const removeEventListener = jest.fn();
  document.addEventListener = addEventListener;
  document.removeEventListener = removeEventListener;

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(cleanup);

  it('handles default', () => {
    const props = { predicate: false, cb, node };
    ({ rerender } = render(<HookTester {...props} />));
    expect(cb).not.toHaveBeenCalled();
    // adding onclick listener
    expect(addEventListener).toHaveBeenCalledTimes(1);
    expect(removeEventListener).not.toHaveBeenCalled();
  });

  it('adds event listeners', () => {
    const props = { predicate: true, cb, node };
    rerender(<HookTester {...props} />);
    expect(cb).not.toHaveBeenCalled();
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(removeEventListener).toHaveBeenCalledTimes(2);
  });

  it('handles events', () => {
    const props = { predicate: true, cb, node: { current: { contains } } };
    const wrapper = shallow(<HookTester {...props} />);
    contains.mockReturnValueOnce(true);
    wrapper.simulate('click', { target: 'something' });
    expect(cb).not.toHaveBeenCalled();
    contains.mockReturnValueOnce(false);
    wrapper.simulate('click', { target: 'a' });
    expect(cb).toHaveBeenCalledTimes(1);
  });
});
