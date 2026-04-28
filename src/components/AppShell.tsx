import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

const navigationItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Patients', to: '/patients' },
];

export function AppShell() {
  const navigate = useNavigate();
  const session = useAppStore((state) => state.session);
  const logout = useAppStore((state) => state.logout);

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-mark">HS</div>
            <div className="sidebar-brand-copy">
              <h1>HealthSync Ops</h1>
              <p>Clinical intelligence for modern care teams.</p>
            </div>
          </div>

          <nav className="sidebar-nav" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
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
