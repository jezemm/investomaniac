import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Layout.css';

const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="app-layout">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="app-header" role="banner">
        <div className="header-content">
          <Link to="/" className="logo" aria-label="Investomaniac homepage">Investomaniac</Link>
          <nav className="nav" role="navigation" aria-label="Main navigation">
            <div className="nav-links">
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                aria-current={location.pathname === '/' ? 'page' : undefined}
              >
                Browse Startups
              </Link>
              <Link 
                to="/portfolio" 
                className={`nav-link ${location.pathname === '/portfolio' ? 'active' : ''}`}
                aria-current={location.pathname === '/portfolio' ? 'page' : undefined}
              >
                My Portfolio
              </Link>
            </div>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main id="main-content" className="main-content" role="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;