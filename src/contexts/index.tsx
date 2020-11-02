import { createContext } from 'react';
import { GlobalContextValue, StateContextValue } from '@/types';

export const GlobalContext = createContext({} as GlobalContextValue);
export const StateContext = createContext({} as StateContextValue);
