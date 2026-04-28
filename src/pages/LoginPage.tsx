import { useEffect, useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isFirebaseConfigured } from '../lib/firebase';
import { useAppStore } from '../store/useAppStore';

type AuthMode = 'login' | 'signup';

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 5.27 4.28 4 20 19.72 18.73 21l-2.47-2.47A12.9 12.9 0 0 1 12 19C7 19 2.73 15.89 1 12c.8-1.8 2.02-3.4 3.55-4.71L3 5.27Zm6.4 6.4a3 3 0 0 0 4.19 4.19L9.4 11.67ZM12 5c5 0 9.27 3.11 11 7a12.85 12.85 0 0 1-4.19 5.1l-1.45-1.45A10.9 10.9 0 0 0 20.84 12C19.3 9.11 15.92 7 12 7c-1.3 0-2.53.23-3.66.64L6.78 6.08A12.6 12.6 0 0 1 12 5Zm-.14 3a4 4 0 0 1 4.14 4.14l-1.93-1.93a2 2 0 0 0-2.21-2.21L9.93 6.07A4.73 4.73 0 0 1 11.86 8Z"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 5c5 0 9.27 3.11 11 7-1.73 3.89-6 7-11 7S2.73 15.89 1 12C2.73 8.11 7 5 12 5Zm0 2C8.08 7 4.7 9.11 3.16 12 4.7 14.89 8.08 17 12 17s7.3-2.11 8.84-5C19.3 9.11 15.92 7 12 7Zm0 2.5A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAppStore((state) => state.login);
  const signup = useAppStore((state) => state.signup);
  const resetPassword = useAppStore((state) => state.resetPassword);
  const session = useAppStore((state) => state.session);
  const isAuthenticating = useAppStore((state) => state.isAuthenticating);
  const authError = useAppStore((state) => state.authError);
  const authNotice = useAppStore((state) => state.authNotice);
  const clearAuthError = useAppStore((state) => state.clearAuthError);
  const clearAuthNotice = useAppStore((state) => state.clearAuthNotice);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (session) {
      navigate((location.state as { from?: string } | null)?.from ?? '/dashboard', {
        replace: true,
      });
    }
  }, [location.state, navigate, session]);

  useEffect(() => {
    clearAuthError();
    clearAuthNotice();
  }, [clearAuthError, clearAuthNotice, authMode]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationError('');

    if (!email.trim() || !password.trim()) {
      setValidationError('Email and password are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Enter a valid email address.');
      return;
    }

    if (authMode === 'signup') {
      if (!name.trim()) {
        setValidationError('Full name is required.');
        return;
      }

      if (password.trim().length < 6) {
        setValidationError('Password must be at least 6 characters.');
        return;
      }

      await signup(name.trim(), email.trim(), password);
      return;
    }

    await login(email.trim(), password);
  }

  async function handleResetPassword() {
    setValidationError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setValidationError('Enter your email address first to reset the password.');
      return;
    }

    await resetPassword(email.trim());
  }

  return (
    <div className="login-layout">
      <section className="login-hero">
        <p className="eyebrow">B2B Healthcare SaaS</p>
        <h1>Centralize care delivery, patient visibility, and clinical response.</h1>
        <p className="hero-copy">
          Monitor admissions, analyze operational load, and coordinate care teams from
          a single responsive workspace.
        </p>

        <div className="hero-panel">
          <div>
            <span>Realtime oversight</span>
            <strong>1,284 active patients</strong>
          </div>
          <div>
            <span>Escalation response</span>
            <strong>12 min average</strong>
          </div>
          <div>
            <span>Deployment ready</span>
            <strong>Firebase + PWA hooks</strong>
          </div>
        </div>
      </section>

      <section className="login-card-wrapper">
        <form className="login-card" onSubmit={handleSubmit}>
          <div>
            <p className="eyebrow">Secure Access</p>
            <h2>{authMode === 'login' ? 'Sign in to HealthSync Ops' : 'Create your admin account'}</h2>
            <p className="muted-copy">
              {isFirebaseConfigured
                ? authMode === 'login'
                  ? 'Use your authorized care operations account to access dashboards, analytics, and patient workflows.'
                  : 'Create a Firebase-backed account to access the care operations workspace and patient workflows.'
                : 'Firebase configuration is required. Add your Firebase web app values to the local environment before testing login.'}
            </p>
          </div>

          <div className="auth-mode-switch" role="tablist" aria-label="Authentication mode">
            <button
              type="button"
              className={authMode === 'login' ? 'auth-mode-button active' : 'auth-mode-button'}
              onClick={() => setAuthMode('login')}
            >
              Sign In
            </button>
            <button
              type="button"
              className={authMode === 'signup' ? 'auth-mode-button active' : 'auth-mode-button'}
              onClick={() => setAuthMode('signup')}
            >
              Sign Up
            </button>
          </div>

          {!isFirebaseConfigured && (
            <p className="helper-copy">
              Missing Firebase setup. Populate `.env` from `.env.example` and enable
              Email/Password auth in Firebase.
            </p>
          )}

          {authMode === 'signup' && (
            <label className="field">
              <span>Full Name</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Care team admin"
              />
            </label>
          )}

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="ops@hospital.com"
            />
          </label>

          <label className="field">
            <span>Password</span>
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
          </label>

          {authNotice && <p className="success-banner">{authNotice}</p>}
          {(validationError || authError) && (
            <p className="error-banner">{validationError || authError}</p>
          )}

          <button
            type="submit"
            className="primary-button"
            disabled={isAuthenticating || !isFirebaseConfigured}
          >
            {isAuthenticating
              ? authMode === 'login'
                ? 'Signing in...'
                : 'Creating account...'
              : authMode === 'login'
                ? 'Login'
                : 'Create Account'}
          </button>

          <div className="auth-secondary-actions">
            <button
              type="button"
              className="text-button"
              onClick={handleResetPassword}
              disabled={isAuthenticating || !isFirebaseConfigured}
            >
              Forgot password?
            </button>
            <p className="auth-secondary-copy">
              {authMode === 'login'
                ? 'New admin? Use Sign Up to create access.'
                : 'Already have an account? Switch back to Sign In.'}
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}
