import React, { useContext } from 'react';
import isEmpty from 'lodash/isEmpty';

import { SelectContext, SelectContextProps } from '../Select';
import { ClearButton } from '../shared/ClearButton';
import { Selectable } from './Selectable';
import { InputContainer } from './InputContainer';

export function SelectInput(): JSX.Element {
  const {
    // downshift
    selectedItem,
    inputValue,
    // props
    onlySelect,
  } = useContext(SelectContext) as SelectContextProps;

  return (
    <div css={{ position: 'relative' }}>
      {onlySelect ? <Selectable /> : <InputContainer />}
      {(!isEmpty(selectedItem) || !isEmpty(inputValue)) && <ClearButton />}
    </div>
  );
}
