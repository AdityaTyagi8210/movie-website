import React, { useState, useEffect } from 'react';
import { Search, Bell, User, ChevronDown, Monitor, Moon, Sun } from 'lucide-react';

const Navbar = ({ activeMenu, setActiveMenu, onSearch, toggleTheme, theme, user, onOpenAuth, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
      setActiveMenu('Search');
    }
  };

  const menuItems = ['Home', 'Movies', 'Series', 'Popular', 'Trends'];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="navbar-container">
        <div className="logo-container">
          <h1 className="logo text-gradient" onClick={() => setActiveMenu('Home')}>flakes</h1>
        </div>
        
        <div className="menu-container">
          <ul className="menu-list">
            {menuItems.map(item => (
              <li 
                key={item}
                className={`menu-list-item ${activeMenu === item ? 'active' : ''}`}
                onClick={() => {
                  setActiveMenu(item);
                  setSearchInput(''); // clear search when clicking category
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="profile-container">
          <form className={`search-form ${isSearchActive ? 'active' : ''}`} onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search movies..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{ display: isSearchActive ? 'block' : 'none' }}
            />
            <Search 
              className="icon" 
              size={20} 
              onClick={() => {
                if (isSearchActive && searchInput) {
                  handleSearchSubmit(new Event('submit'));
                } else {
                  setIsSearchActive(!isSearchActive);
                }
              }} 
            />
          </form>
          
          <Bell className="icon" size={20} />
          
          {user ? (
            <div className="profile">
              <User className="icon user-icon" size={20} />
              <span className="profile-text" style={{marginRight: '15px'}}>{user.username}</span>
              <button className="auth-btn" onClick={onLogout}>Logout</button>
            </div>
          ) : (
            <div className="profile">
              <button className="auth-btn" onClick={() => onOpenAuth('login')}>Login</button>
              <button className="auth-btn signup-btn" onClick={() => onOpenAuth('register')}>Sign Up</button>
            </div>
          )}

          {/* Theme Toggle */}
          <div className={`theme-toggle ${theme === 'light' ? 'light' : 'dark'}`} onClick={toggleTheme}>
             {theme === 'light' ? <Sun size={14} className="toggle-icon-sun" /> : <Moon size={14} className="toggle-icon-moon" />}
             <div className="toggle-ball"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
