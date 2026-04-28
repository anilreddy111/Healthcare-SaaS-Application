import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
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
  authNotice: string | null;
  viewMode: ViewMode;
  patients: typeof patients;
  setSession: (session: AuthSession | null) => void;
  setViewMode: (viewMode: ViewMode) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  clearAuthError: () => void;
  clearAuthNotice: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      session: null,
      isAuthenticating: false,
      authError: null,
      authNotice: null,
      viewMode: 'grid',
      patients,
      setSession: (session) => set({ session }),
      setViewMode: (viewMode) => set({ viewMode }),
      clearAuthError: () => set({ authError: null }),
      clearAuthNotice: () => set({ authNotice: null }),
      login: async (email, password) => {
        set({ isAuthenticating: true, authError: null, authNotice: null });

        try {
          if (!isFirebaseConfigured || !auth) {
            throw new Error(
              'Firebase Authentication is not configured. Add your Vite Firebase environment variables to enable login.',
            );
          }

          const credentials = await signInWithEmailAndPassword(auth, email, password);
          set({
            session: {
              email: credentials.user.email ?? email,
              displayName: credentials.user.displayName ?? 'Operations Admin',
              mode: 'firebase',
            },
            authNotice: null,
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Unable to sign in. Please try again.';
          set({ authError: message, session: null });
        } finally {
          set({ isAuthenticating: false });
        }
      },
      signup: async (name, email, password) => {
        set({ isAuthenticating: true, authError: null, authNotice: null });

        try {
          if (!isFirebaseConfigured || !auth) {
            throw new Error(
              'Firebase Authentication is not configured. Add your Vite Firebase environment variables to enable signup.',
            );
          }

          const credentials = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(credentials.user, { displayName: name });

          set({
            session: {
              email: credentials.user.email ?? email,
              displayName: name || credentials.user.displayName || 'Operations Admin',
              mode: 'firebase',
            },
            authNotice: 'Account created successfully. You are now signed in.',
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Unable to create account. Please try again.';
          set({ authError: message, session: null });
        } finally {
          set({ isAuthenticating: false });
        }
      },
      resetPassword: async (email) => {
        set({ isAuthenticating: true, authError: null, authNotice: null });

        try {
          if (!isFirebaseConfigured || !auth) {
            throw new Error(
              'Firebase Authentication is not configured. Add your Vite Firebase environment variables to enable password reset.',
            );
          }

          await sendPasswordResetEmail(auth, email);
          set({
            authNotice:
              'Password reset email sent. Check your inbox and follow the reset link.',
          });
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : 'Unable to send password reset email. Please try again.';
          set({ authError: message });
        } finally {
          set({ isAuthenticating: false });
        }
      },
      logout: async () => {
        if (auth && isFirebaseConfigured) {
          await signOut(auth);
        }
        set({ session: null, authError: null, authNotice: null });
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
