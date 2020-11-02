import React, { useContext } from 'react';

import { ExitIcon } from '@/components/common';
import { SelectContext, SelectContextProps } from '../Select';
import { InputButton } from './InputButton';

export function ClearButton(): JSX.Element {
  const { clearSelection, clear, inputId } = useContext(SelectContext) as SelectContextProps;

  return (
    <InputButton
      role="button"
      type="button"
      onClick={(): void => clearSelection(clear)}
      data-tn={`tours-${inputId}-select-clear`}
    >
      <ExitIcon left={true} />
    </InputButton>
  );
}
