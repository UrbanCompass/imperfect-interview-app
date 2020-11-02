import { itemToString, filterItems, filterOutSelectedItems } from './helpers';

describe('itemToString', (): void => {
  it('returns value if item has value', (): void => {
    expect(itemToString({ value: 'foo' })).toEqual('foo');
    expect(itemToString({ value: 1 })).toEqual(1);
  });

  it('returns empty string if item has no value', (): void => {
    expect(itemToString(null)).toEqual('');
    expect(itemToString({ value: '' })).toEqual('');
    expect(itemToString({ v: 1 })).toEqual('');
  });
});

describe('filterItems', (): void => {
  const items = [{ value: 'foo' }, { value: 'bar' }, { value: 'foobar' }];

  it('returns all items if inputValue is empty', (): void => {
    expect(filterItems({ items, inputValue: '' })).toEqual(items);
    expect(filterItems({ items, inputValue: null })).toEqual(items);
  });

  it('returns items include inputValue', (): void => {
    expect(filterItems({ items, inputValue: 'foo' })).toEqual([
      { value: 'foo' },
      { value: 'foobar' },
    ]);
    expect(filterItems({ items, inputValue: 'bar' })).toEqual([
      { value: 'bar' },
      { value: 'foobar' },
    ]);
  });
});

describe('filterOutSelectedItems', (): void => {
  const items = [{ id: 'foo' }, { id: 'bar' }, { id: 'foobar' }];

  it('returns all items if selectedItems are empty', (): void => {
    expect(filterOutSelectedItems({ items, selectedItems: [] })).toEqual(items);
  });

  it('returns items that not in selectedItems', (): void => {
    expect(filterOutSelectedItems({ items, selectedItems: [{ id: 'bar' }] })).toEqual([
      { id: 'foo' },
      { id: 'foobar' },
    ]);
    expect(filterOutSelectedItems({ items, selectedItems: [{ id: 'foo' }] })).toEqual([
      { id: 'bar' },
      { id: 'foobar' },
    ]);
  });
});
