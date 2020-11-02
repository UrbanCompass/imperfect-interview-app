import React, { useContext, useMemo } from 'react';
import serialize from 'serialize-javascript';
import isEmpty from 'lodash/isEmpty';

import { useTypeaheadLoad } from '@/hooks/data/useTypeaheadLoad';
import { SelectContext, SelectContextProps, Item } from './Select';
import { Items } from './shared/Items';
import { filterOutSelectedItems } from './helpers';

export function FetchDataDropdown(): JSX.Element | null {
  const {
    inputValue,
    selectedItem,
    /* istanbul ignore next */
    fetchDataProps = { loadFn: {}, makeLoadProps: {}, transformToItems: {} },
    selectedItems = [],
  } = useContext(SelectContext) as SelectContextProps;

  if (selectedItem && selectedItems.length === 0) {
    selectedItems.push(selectedItem);
  }

  const { loadFn, makeLoadProps, transformToItems } = fetchDataProps;
  /* istanbul ignore next  */
  const { data = {}, loaded, ...rest } = useTypeaheadLoad({
    inputValue,
    loadFn,
    makeLoadProps,
  });

  const itemsToDisplay = useMemo((): Item[] => {
    if (loaded && !isEmpty(data) && typeof transformToItems === 'function') {
      const rawMatch = transformToItems(data);
      return filterOutSelectedItems({ items: rawMatch, selectedItems });
    }
    return [];
  }, [serialize(data)]);

  // always render so `Items` can display loading or loadError
  return inputValue ? <Items itemsToDisplay={itemsToDisplay} {...rest} /> : null;
}
