import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

const navigationItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Patients', to: '/patients' },
];

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19 5 17.6 10.6 12 5 6.4 6.4 5Z"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16v2H4V7Zm0 8v-2h16v2H4Zm0-6h16v2H4V9Z" fill="currentColor" />
    </svg>
  );
}

export function AppShell() {
  const navigate = useNavigate();
  const session = useAppStore((state) => state.session);
  const logout = useAppStore((state) => state.logout);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <div className="app-shell">
      <aside className={isMenuOpen ? 'sidebar sidebar-menu-open' : 'sidebar'}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-mark">HS</div>
            <div className="sidebar-brand-copy">
              <h1>HealthSync Ops</h1>
              <p>Clinical intelligence for modern care teams.</p>
            </div>
            <button
              type="button"
              className="sidebar-menu-button"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <MenuIcon open={isMenuOpen} />
            </button>
          </div>

          <nav className="sidebar-nav" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link-active' : 'nav-link'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-account">
            <strong>{session?.displayName}</strong>
            <p>{session?.email}</p>
          </div>
          <button type="button" className="ghost-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
