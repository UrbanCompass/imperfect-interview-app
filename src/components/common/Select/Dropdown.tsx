import React, { useContext, useMemo } from 'react';
import serialize from 'serialize-javascript';

import { SelectContext, SelectContextProps, Item } from './Select';
import { filterItems, filterOutSelectedItems } from './helpers';
import { Items } from './shared/Items';

export function Dropdown(): JSX.Element | null {
  const {
    // downshift
    inputValue,
    selectedItem,
    // props
    selectedItems = [],
    items,
    onlySelect,
    showAllItems,
  } = useContext(SelectContext) as SelectContextProps;

  if (selectedItem && selectedItems.length === 0) {
    selectedItems.push(selectedItem);
  }

  // match items by input
  const matchedItems = useMemo((): Item[] => {
    const rawMatch = filterItems({ items, inputValue });
    return filterOutSelectedItems({ items: rawMatch, selectedItems });
  }, [inputValue, serialize(items)]);

  // display only non-selected items (`onlySelect`)
  const remainingItems = useMemo((): Item[] => {
    return filterOutSelectedItems({ items, selectedItems });
  }, [serialize(items), serialize(selectedItems)]);

  const itemsToDisplay = showAllItems ? items : onlySelect ? remainingItems : matchedItems;

  return Array.isArray(itemsToDisplay) && itemsToDisplay.length > 0 ? (
    <Items itemsToDisplay={itemsToDisplay} />
  ) : null;
}
