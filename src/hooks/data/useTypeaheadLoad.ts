import { useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

import { useLoad } from './useLoad';

export function useTypeaheadLoad({
  inputValue,
  loadFn,
  makeLoadProps,
}): { loading: boolean; loadError: boolean; loaded: boolean; data } {
  const { loading, loadError, loaded, data, fetchData } = useLoad();

  const debouncedLoad = useCallback(
    debounce((value: string): Promise<void> => fetchData(loadFn, makeLoadProps(value)), 280),
    []
  );

  useEffect((): void => {
    if (typeof inputValue !== 'undefined' && inputValue.length > 1) {
      debouncedLoad(inputValue);
    }
  }, [inputValue]);

  return { loading, loadError, loaded, data };
}
