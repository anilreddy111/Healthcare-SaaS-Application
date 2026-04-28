import { useEffect, useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isFirebaseConfigured } from '../lib/firebase';
import { useAppStore } from '../store/useAppStore';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAppStore((state) => state.login);
  const session = useAppStore((state) => state.session);
  const isAuthenticating = useAppStore((state) => state.isAuthenticating);
  const authError = useAppStore((state) => state.authError);
  const clearAuthError = useAppStore((state) => state.clearAuthError);
  const [email, setEmail] = useState('demo@healthsync.com');
  const [password, setPassword] = useState('demo1234');
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
                : 'Firebase is optional for this preview. Demo credentials are prefilled.'}
            </p>
          </div>

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
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
            />
          </label>

          {(validationError || authError) && (
            <p className="error-banner">{validationError || authError}</p>
          )}

          <button type="submit" className="primary-button" disabled={isAuthenticating}>
            {isAuthenticating ? 'Signing in...' : 'Login'}
          </button>

          {!isFirebaseConfigured && (
            <p className="helper-copy">
              Demo login: <strong>demo@healthsync.com</strong> / <strong>demo1234</strong>
            </p>
          )}
        </form>
      </section>
    </div>
  );
}
