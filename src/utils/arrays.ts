/**
 * @param arr Any array
 * @param newItems An array of items to add, or a single non-array item
 * @returns A copy of `arr` with all items in `newItems` appended
 */
export function arrayWithItems<T>(arr: Array<T>, newItems: Array<T> | T): Array<T> {
  const arrCopy = arr.slice();
  return arrCopy.concat(newItems);
}

/**
 * @param arr An array
 * @param removeItems An array of items to remove, or a single non-array item
 * @returns A copy of `arr` with all items in `removeItems` removed
 */
export function arrayWithoutItems<T>(arr: Array<T>, removeItems: Array<T> | T): Array<T> {
  const arrCopy = arr.slice();
  const removeItemsArray = Array.isArray(removeItems) ? removeItems : [removeItems];
  removeItemsArray.forEach((removeItem) => {
    if (arrCopy.includes(removeItem)) {
      arrCopy.splice(arrCopy.indexOf(removeItem), 1);
    }
  });
  return arrCopy;
}
