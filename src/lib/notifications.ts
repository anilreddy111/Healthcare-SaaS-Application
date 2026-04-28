const SW_URL = '/sw.js';

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(SW_URL).catch((error) => {
        console.error('Service worker registration failed:', error);
      });
    });
  }
}

export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    return 'unsupported';
  }

  const permission = await Notification.requestPermission();
  return permission;
}

export async function notifyCareTeam(title: string, body: string) {
  if (!('serviceWorker' in navigator) || !('Notification' in window)) {
    throw new Error('Notifications are not supported in this browser.');
  }

  const permission =
    Notification.permission === 'granted'
      ? 'granted'
      : await requestNotificationPermission();

  if (permission !== 'granted') {
    throw new Error('Notification permission was not granted.');
  }

  const registration = await navigator.serviceWorker.ready;
  await registration.showNotification(title, {
    body,
    icon: '/health-icon.svg',
    badge: '/health-icon.svg',
    tag: 'care-team-alert',
    data: { url: '/patients' },
  });
}
