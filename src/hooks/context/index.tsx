import { useContext } from 'react';

import { GlobalContext, StateContext } from '@/contexts';
import { GlobalContextValue, StateContextValue } from '@/types';

export function useGlobalContext(): GlobalContextValue {
  return useContext(GlobalContext);
}

export function useStateContext(): StateContextValue {
  return useContext(StateContext);
}
