import * as filestack from 'filestack-js';

import { FILESTACK_API_KEY } from '@/constants';

export const filestackClient = filestack.init(FILESTACK_API_KEY);
