export interface RegisterVupPwaOptions {
  swUrl?: string;
  scope?: string;
  immediate?: boolean;
  onRegistered?: (registration: ServiceWorkerRegistration) => void;
  onRegisterError?: (error: unknown) => void;
  onNeedRefresh?: (registration: ServiceWorkerRegistration) => void;
  onOfflineReady?: (registration: ServiceWorkerRegistration) => void;
}

export interface VupPwaState {
  isSupported: boolean;
  isRegistered: boolean;
  isControllingPage: boolean;
  isStandalone: boolean;
}

function canUseServiceWorker() {
  return typeof window !== 'undefined' && 'serviceWorker' in navigator;
}

function notifyIfReady(registration: ServiceWorkerRegistration, options: RegisterVupPwaOptions) {
  if (registration.active && navigator.serviceWorker.controller) {
    options.onOfflineReady?.(registration);
  }
}

function watchInstallingWorker(
  registration: ServiceWorkerRegistration,
  options: RegisterVupPwaOptions
) {
  const worker = registration.installing;
  if (!worker) return;

  worker.addEventListener('statechange', () => {
    if (worker.state !== 'installed') return;

    if (navigator.serviceWorker.controller) {
      options.onNeedRefresh?.(registration);
      return;
    }

    options.onOfflineReady?.(registration);
  });
}

export async function registerVupPwa(
  options: RegisterVupPwaOptions = {}
): Promise<ServiceWorkerRegistration | null> {
  if (!canUseServiceWorker()) return null;

  const { swUrl = '/sw.js', scope, immediate = true, onRegistered, onRegisterError } = options;

  try {
    const registration = await navigator.serviceWorker.register(swUrl, {
      ...(scope ? { scope } : {}),
    });

    registration.addEventListener('updatefound', () => {
      watchInstallingWorker(registration, options);
    });

    if (immediate) {
      void registration.update();
    }

    watchInstallingWorker(registration, options);
    notifyIfReady(registration, options);
    onRegistered?.(registration);

    return registration;
  } catch (error) {
    onRegisterError?.(error);
    return null;
  }
}

export async function updateVupPwa(registration?: ServiceWorkerRegistration | null) {
  if (!registration) return;
  await registration.update();
}

export async function activateWaitingVupPwa(registration?: ServiceWorkerRegistration | null) {
  registration?.waiting?.postMessage({ type: 'SKIP_WAITING' });
}

export async function unregisterVupPwa(registration?: ServiceWorkerRegistration | null) {
  if (!registration) return false;
  return registration.unregister();
}

export function getVupPwaState(): VupPwaState {
  const isSupported = canUseServiceWorker();
  const hasRegistrationApi =
    typeof navigator !== 'undefined' &&
    typeof navigator.serviceWorker?.getRegistration === 'function';
  const isControllingPage =
    typeof navigator !== 'undefined' ? Boolean(navigator.serviceWorker?.controller) : false;
  const isStandalone =
    typeof window !== 'undefined' &&
    (window.matchMedia('(display-mode: standalone)').matches ||
      (typeof navigator !== 'undefined' && 'standalone' in navigator
        ? Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
        : false));

  return {
    isSupported,
    isRegistered: hasRegistrationApi,
    isControllingPage,
    isStandalone,
  };
}
