import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { patients } from '../data/patients';
import { auth, isFirebaseConfigured } from '../lib/firebase';
import type { AuthSession } from '../types';

type ViewMode = 'grid' | 'list';

interface AppState {
  session: AuthSession | null;
  isAuthenticating: boolean;
  authError: string | null;
  viewMode: ViewMode;
  patients: typeof patients;
  setSession: (session: AuthSession | null) => void;
  setViewMode: (viewMode: ViewMode) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearAuthError: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      session: null,
      isAuthenticating: false,
      authError: null,
      viewMode: 'grid',
      patients,
      setSession: (session) => set({ session }),
      setViewMode: (viewMode) => set({ viewMode }),
      clearAuthError: () => set({ authError: null }),
      login: async (email, password) => {
        set({ isAuthenticating: true, authError: null });

        try {
          if (isFirebaseConfigured && auth) {
            const credentials = await signInWithEmailAndPassword(auth, email, password);
            set({
              session: {
                email: credentials.user.email ?? email,
                displayName: credentials.user.displayName ?? 'Operations Admin',
                mode: 'firebase',
              },
            });
            return;
          }

          if (email === 'demo@healthsync.com' && password === 'demo1234') {
            set({
              session: {
                email,
                displayName: 'Demo Operations Admin',
                mode: 'demo',
              },
            });
            return;
          }

          throw new Error(
            'Firebase environment variables are missing. Use demo@healthsync.com / demo1234 for the assignment preview.',
          );
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Unable to sign in. Please try again.';
          set({ authError: message, session: null });
        } finally {
          set({ isAuthenticating: false });
        }
      },
      logout: async () => {
        if (auth && isFirebaseConfigured) {
          await signOut(auth);
        }
        set({ session: null, authError: null });
      },
    }),
    {
      name: 'healthsync-store',
      partialize: (state) => ({
        session: state.session,
        viewMode: state.viewMode,
      }),
    },
  ),
);
