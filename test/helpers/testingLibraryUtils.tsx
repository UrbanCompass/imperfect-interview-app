import React, { Dispatch, SetStateAction } from 'react';
import { render, RenderResult, screen } from '@testing-library/react';

import { GlobalContext, StateContext } from '@/contexts';
import { MUSIC_TRACKS } from '@/constants';
import { MusicTrack, GlobalContextValue, StateContextValue } from '@/types';

const DEFAULT_GLOBAL_CONTEXT = {} as GlobalContextValue;
const DEFAULT_STATE_CONTEXT = {
  music: MUSIC_TRACKS[0].tracks[0],
  setMusic: jest.fn() as Dispatch<SetStateAction<MusicTrack | null>>,
} as StateContextValue;

/*
 * Use getRenderWithContext when rendering a component for a test but need to modify any
 * global/state context values to be different from the default values.
 *
 * @param {GlobalContextValue} globalContextOverrides - An object with any properties to override the default global context
 * @param {StateContextValue} stateContextOverrides - An object with any properties to override the default state context
 * @returns {((ui: JSX.Element, options?: any) => RenderResult)} A function equivalent to RTL's render function but with the wrapped context providers
 */
function getRenderWithContext(
  globalContextOverrides: GlobalContextValue = {} as GlobalContextValue,
  stateContextOverrides: StateContextValue = {} as StateContextValue
): (ui: JSX.Element, options?: any) => RenderResult {
  const globalValue = { ...DEFAULT_GLOBAL_CONTEXT, ...globalContextOverrides };
  const stateValue = { ...DEFAULT_STATE_CONTEXT, ...stateContextOverrides };

  function wrapper({ children }: any): JSX.Element {
    return (
      <GlobalContext.Provider value={globalValue}>
        <StateContext.Provider value={stateValue}>{children}</StateContext.Provider>
      </GlobalContext.Provider>
    );
  }

  function customRender(ui: JSX.Element, options?: any): RenderResult {
    return render(ui, {
      wrapper,
      ...options,
    });
  }
  return customRender;
}

// This is equivalent to the render method in Testing Library with default global/state values.
const defaultRender = getRenderWithContext({} as GlobalContextValue, {} as StateContextValue);

// Re-export everything
export * from '@testing-library/react';

// Override render methods
export { getRenderWithContext, defaultRender as render, screen };
