import { Globals } from '@/types';

import { UC_GLOBALS_ID } from '@/constants';

/* istanbul ignore next */
export function getGlobals(): Globals {
  try {
    const globalsElem = document.getElementById(UC_GLOBALS_ID);
    // eslint-disable-next-line no-eval
    return eval(`(${globalsElem ? globalsElem.textContent : {}})`);
  } catch (e) {
    return {};
  }
}
