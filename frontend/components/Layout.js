import React from 'react';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';
import { logout } from '../src/lib/auth';

const Layout = props => {
  const { children, user } = props;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="user-info pa3 bg-light-gray">
        {user ? (
          <div className="flex justify-between items-center">
            <div>
              <span className="mr3">Welcome, {user.email}</span>
              {user.displayName && <span>({user.displayName})</span>}
            </div>
            <button
              className="round-btn ba bw1 pv2 ph3"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex justify-end">
            <a href="/login" className="round-btn ba bw1 pv2 ph3">
              Login
            </a>
          </div>
        )}
      </div>
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
