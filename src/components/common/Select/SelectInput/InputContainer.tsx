import React, { useContext } from 'react';
import styled from '@emotion/styled';

import { SelectContext, SelectContextProps } from '../Select';

export const Input = styled.input`
  box-sizing: border-box;
  user-select: text;
  width: 100%;
`;
Input.displayName = 'Input';

const InputWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  width: 100%;
`;
InputWrapper.displayName = 'InputWrapper';

export function InputContainer(): JSX.Element {
  const {
    // downshift
    getInputProps,
    toggleMenu,
    // props
    autoFocus,
    inputId,
    placeholder,
    inputStyle,
    value,
    onValueChange,
  } = useContext(SelectContext) as SelectContextProps;

  return (
    <InputWrapper>
      <Input
        {...getInputProps({
          id: inputId,
          type: 'text',
          className: 'cx-selectField-arrow',
          placeholder,
          autoFocus,
          spellCheck: false,
          autoComplete: 'off',
          autoCorrect: 'off',
          autoCapitalize: 'off',
          style: inputStyle,
          onKeyDown: (event) => {
            /* istanbul ignore else */
            if (value && onValueChange && event.key === 'Enter') {
              onValueChange(value);
              const inputElement = document.getElementById(inputId);
              /* istanbul ignore next */
              if (inputElement) {
                inputElement.blur();
              }
            }
          },
        })}
        data-tn={`tours-${inputId}-select-input`}
        onClick={(): void => toggleMenu()}
      />
    </InputWrapper>
  );
}
