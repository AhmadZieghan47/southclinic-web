import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Bell, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import type { MainLayoutProps, MenuItem } from './MainLayout.types';
import styles from './MainLayout.module.css';

/**
 * MainLayout Component
 * 
 * Main application layout with sidebar navigation and header.
 */
export const MainLayout = ({
  logoText = 'South Clinic',
  menuItems,
  userName = 'User',
  notificationCount = 0,
  onLogout,
}: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const isGroupExpanded = (groupId: string) => expandedGroups.includes(groupId);

  const renderNavItem = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      const isExpanded = isGroupExpanded(item.id);

      return (
        <div key={item.id} className={styles.navGroup}>
          <button
            className={styles.navGroupTitle}
            onClick={() => toggleGroup(item.id)}
          >
            <span className={styles.navGroupTitleContent}>
              {item.icon}
              {item.label}
            </span>
            <ChevronDown
              size={16}
              className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}
            />
          </button>
          {isExpanded && (
            <div className={styles.navGroupChildren}>
              {item.children.map((child) => (
                <NavLink
                  key={child.id}
                  to={child.path}
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        key={item.id}
        to={item.path || '/'}
        className={({ isActive }) =>
          `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
        }
        onClick={() => setSidebarOpen(false)}
      >
        {item.icon}
        {item.label}
      </NavLink>
    );
  };

  return (
    <div className={styles.layout}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}
      >
        <div className={styles.logo}>{logoText}</div>
        <nav className={styles.nav}>
          {menuItems.map(renderNavItem)}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button
              className={styles.menuToggle}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className={styles.headerRight}>
            <button className={styles.notificationBtn}>
              <Bell size={20} />
              {notificationCount > 0 && (
                <span className={styles.notificationBadge}>
                  {notificationCount > 99 ? '99+' : notificationCount}
                </span>
              )}
            </button>

            <div className={styles.userMenu}>
              <div className={styles.avatar}>
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className={styles.userName}>{userName}</span>
            </div>

            {onLogout && (
              <button className={styles.logoutBtn} onClick={onLogout} title="Logout">
                <LogOut size={20} />
              </button>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
