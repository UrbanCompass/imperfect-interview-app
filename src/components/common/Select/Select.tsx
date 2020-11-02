import React, { createContext } from 'react';
import Downshift, { ControllerStateAndHelpers, StateChangeOptions } from 'downshift';
import isEmpty from 'lodash/isEmpty';

import { SelectInput } from './SelectInput';
import { Dropdown } from './Dropdown';
import { itemToString } from './helpers';
import { FetchDataDropdown } from './FetchDataDropdown';

export const SelectContext = createContext({});

export interface Item {
  value: string | number;
  id: string;
  style?: Record<string, string>;
}

interface SelectProps {
  autoFocus?: boolean;
  placeholder?: string;
  inputId: string;
  labelText?: string;
  items?: Item[];
  selectedItems?: Item[];
  selectedItem?: Item | undefined;
  onChange: (val: any, actions?: any) => void;
  onStateChange?: (
    options: StateChangeOptions<Item>,
    stateAndHelpers: ControllerStateAndHelpers<Item>
  ) => void;
  onInputValueChange?: (val: any, actions?: any) => void;
  stateReducer?: (state, changes) => Partial<StateChangeOptions<any>>;
  clear?(): void;
  removeItem?(item: Item): void;
  onlySelect?: boolean;
  highlightIndex?: number;
  initialInputValue?: string;
  fetchDataProps?: {
    loadFn: Function;
    makeLoadProps: Function;
    transformToItems: Function;
  };
  inputStyle?: Record<string, string>;
  containerStyle?: Record<string, string>;
  disableInput?: boolean;
  showAllItems?: boolean;
  inputIndex?: number;
  value?: string;
  onValueChange?(val: string): void;
  onEnterKey?: (val?: string | null) => void;
  onTabKey?: (val?: string | null) => void;
  initialIsOpen?: boolean;
  hideDropdown?: boolean;
}

export type SelectContextProps = SelectProps & ControllerStateAndHelpers<Item> & { id?: string };

function Select({
  onChange,
  onStateChange,
  onInputValueChange,
  labelText,
  inputId,
  fetchDataProps,
  highlightIndex,
  initialInputValue,
  disableInput,
  initialIsOpen,
  containerStyle,
  stateReducer,
  hideDropdown,
  ...rest
}: SelectProps): JSX.Element {
  return (
    <Downshift
      id={`downshift-${inputId}`}
      onChange={onChange}
      onStateChange={onStateChange}
      onInputValueChange={onInputValueChange}
      itemToString={itemToString}
      defaultHighlightedIndex={highlightIndex}
      initialInputValue={initialInputValue}
      initialIsOpen={initialIsOpen}
      stateReducer={stateReducer}
    >
      {(downshift): JSX.Element => {
        const { getLabelProps, isOpen } = downshift;

        return (
          <div>
            <SelectContext.Provider
              value={{
                ...downshift,
                ...rest,
                fetchDataProps,
                inputId,
                disableInput,
                containerStyle,
              }}
            >
              {/* eslint-disable-next-line jsx-a11y/label-has-for */}
              <label
                htmlFor={inputId}
                className="cx-formElement"
                {...getLabelProps({ css: { position: 'relative', ...containerStyle } })}
              >
                {labelText && <p className="cx-formElement-label">{labelText}</p>}
                <SelectInput />
                {hideDropdown
                  ? null
                  : isOpen && (!isEmpty(fetchDataProps) ? <FetchDataDropdown /> : <Dropdown />)}
              </label>
            </SelectContext.Provider>
          </div>
        );
      }}
    </Downshift>
  );
}

export { Select };
