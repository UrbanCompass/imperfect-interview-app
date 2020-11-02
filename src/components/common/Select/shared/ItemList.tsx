import React, { useContext, useEffect } from 'react';
import classnames from 'classnames';

import { SelectContext, SelectContextProps, Item } from '../Select';

interface ItemListProps {
  itemList: Item[];
}

export function ItemList({ itemList }: ItemListProps): JSX.Element {
  const { getItemProps, highlightedIndex, inputId, inputIndex, id } = useContext(
    SelectContext
  ) as SelectContextProps;

  useEffect(() => {
    if (!inputIndex) return;
    const item = document.getElementById(`${id}-item-${inputIndex}`);
    /* istanbul ignore next */
    if (item) item.scrollIntoView({ block: 'center' });
  }, [inputIndex]);

  return (
    <>
      {itemList.map(
        (item, itemIndex): JSX.Element => {
          const index = itemIndex;

          return (
            <li
              className={classnames('cx-optionsMenu-item', {
                'is-active': highlightedIndex === index || inputIndex === index,
              })}
              key={item.id}
              {...getItemProps({
                index,
                item,
              })}
              data-tn={`tours-${inputId}-dropdown-item`}
            >
              {item.value}
            </li>
          );
        }
      )}
    </>
  );
}
