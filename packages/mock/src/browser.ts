import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

let workerStarted = false;

export async function startMockWorker() {
  if (workerStarted) return;

  const worker = setupWorker(...handlers);
  await worker.start({
    onUnhandledRequest: 'bypass',
  });
  workerStarted = true;
}
