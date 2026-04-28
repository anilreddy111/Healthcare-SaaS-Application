import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, isFirebaseConfigured } from '../lib/firebase';
import { useAppStore } from '../store/useAppStore';

export function useAuthBootstrap() {
  const setSession = useAppStore((state) => state.setSession);
  const [isReady, setIsReady] = useState(!isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession({
          email: user.email ?? 'care.team@healthsync.com',
          displayName: user.displayName ?? 'Care Team Admin',
          mode: 'firebase',
        });
      } else {
        setSession(null);
      }
      setIsReady(true);
    });

    return unsubscribe;
  }, [setSession]);

  return { isReady };
}
