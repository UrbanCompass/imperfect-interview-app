import React, { useContext } from 'react';
import styled from '@emotion/styled';

import { SelectContext, SelectContextProps, Item } from '../Select';
import { ItemList } from './ItemList';

export const Wrapper = styled.div`
  position: absolute;
  z-index: var(--cx-zIndex-1);
  width: 100%;
`;
Wrapper.displayName = 'DropdownWrapper';

export const ItemsContainer = styled.div`
  overflow-y: scroll;
  max-height: 250px;
`;
ItemsContainer.displayName = 'ItemsContainer';

interface ItemsProps {
  loading?: boolean;
  loadError?: boolean;
  itemsToDisplay: Item[];
}

export function Items({ itemsToDisplay, loading, loadError }: ItemsProps): JSX.Element {
  const { getMenuProps, inputId } = useContext(SelectContext) as SelectContextProps;

  return (
    <Wrapper className="cx-flyoutContainer cx-optionsMenu">
      <ItemsContainer
        className="cx-optionsMenu-section"
        {...getMenuProps()}
        data-tn={`tours-${inputId}-dropdown-container`}
      >
        {loading ? (
          <li className="cx-optionsMenu-item">Loading...</li>
        ) : loadError ? (
          <li className="cx-optionsMenu-item">Request failed</li>
        ) : (
          <ItemList itemList={itemsToDisplay} />
        )}
      </ItemsContainer>
    </Wrapper>
  );
}
