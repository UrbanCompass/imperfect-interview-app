import React from 'react';
import { shallow } from 'enzyme';

import { Icon, EllipsisIcon, ExitIcon, TrashIcon } from './Icon';

describe('Icon', (): void => {
  it('render', (): void => {
    expect(shallow(<Icon name="x" left={true} />)).toMatchSnapshot();
  });

  it('renders additional class', (): void => {
    expect(shallow(<Icon name="x" right={true} className="my-icon" />)).toMatchSnapshot();
  });

  it('render ExitIcon', (): void => {
    expect(shallow(<ExitIcon />)).toMatchSnapshot();
  });

  it('render EllipsisIcon', (): void => {
    expect(shallow(<EllipsisIcon />)).toMatchSnapshot();
  });

  it('render TrashIcon', (): void => {
    expect(shallow(<TrashIcon />)).toMatchSnapshot();
  });
});
