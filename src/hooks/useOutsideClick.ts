import { useEffect, RefObject } from 'react';
import get from 'lodash/get';

export function useOutsideClick({
  predicate,
  ref,
  cb,
}: {
  predicate: boolean;
  ref: RefObject<HTMLInputElement>;
  cb: Function;
}): (evt?: Event) => void {
  function listener(event?: Event): void {
    if (ref.current && !ref.current.contains(get(event, 'target'))) {
      cb(event);
    }
  }

  useEffect((): (() => void) => {
    if (predicate) {
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
    }

    return (): void => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [predicate]);

  // for testing only
  return listener;
}
