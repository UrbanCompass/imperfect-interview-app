import toLower from 'lodash/toLower';
import { Item } from './Select';

export function itemToString(item): string {
  return item ? (item.value ? item.value : '') : '';
}

export function filterItems({ items, inputValue }): Item[] {
  return !inputValue
    ? items
    : items.filter(({ value }): boolean => toLower(value).includes(toLower(inputValue)));
}

export function filterOutSelectedItems({ items, selectedItems }): Item[] {
  return selectedItems.length === 0
    ? items
    : items.filter((item): boolean => {
        return !selectedItems.some((selected): boolean => {
          return item.id === selected.id;
        });
      });
}
