import React, { useContext } from 'react';

import { SelectContext, SelectContextProps } from '../Select';

export function Selectable(): JSX.Element {
  const {
    // downshift
    getToggleButtonProps,
    // props
    inputId,
    selectedItem,
    placeholder,
    inputStyle,
  } = useContext(SelectContext) as SelectContextProps;
  return (
    <div
      tabIndex="0"
      role="listbox"
      {...getToggleButtonProps({
        id: inputId,
        className: 'cx-selectField u-flexContainer--row',
        css: { boxSizing: 'border-box', ...inputStyle },
      })}
      data-tn={`tours-${inputId}-select-button`}
    >
      {selectedItem ? <>{selectedItem.value}</> : <>{placeholder}</>}
    </div>
  );
}
