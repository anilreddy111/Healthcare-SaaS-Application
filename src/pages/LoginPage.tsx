import { useEffect, useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isFirebaseConfigured } from '../lib/firebase';
import { useAppStore } from '../store/useAppStore';

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
  const session = useAppStore((state) => state.session);
  const isAuthenticating = useAppStore((state) => state.isAuthenticating);
  const authError = useAppStore((state) => state.authError);
  const clearAuthError = useAppStore((state) => state.clearAuthError);
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

  useEffect(() => clearAuthError, [clearAuthError]);

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

    await login(email.trim(), password);
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
            <h2>Sign in to HealthSync Ops</h2>
            <p className="muted-copy">
              {isFirebaseConfigured
                ? 'Authenticate with your Firebase user credentials.'
                : 'Firebase configuration is required. Add your Firebase web app values to the local environment before testing login.'}
            </p>
          </div>

          {!isFirebaseConfigured && (
            <p className="helper-copy">
              Missing Firebase setup. Populate `.env` from `.env.example` and enable
              Email/Password auth in Firebase.
            </p>
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

          {(validationError || authError) && (
            <p className="error-banner">{validationError || authError}</p>
          )}

          <button
            type="submit"
            className="primary-button"
            disabled={isAuthenticating || !isFirebaseConfigured}
          >
            {isAuthenticating ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </section>
    </div>
  );
}
