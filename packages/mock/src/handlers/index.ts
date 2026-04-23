import type { RequestHandler } from 'msw';

import { demoHandlers } from './demo';

export const handlers: RequestHandler[] = [...demoHandlers];
