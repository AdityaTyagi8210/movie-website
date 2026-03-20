import React from 'react';
import { Home, Users, Bookmark, Tv, Clock, ShoppingCart } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="sidebar glass">
      <Home className="left-menu-icon" size={24} />
      <Users className="left-menu-icon" size={24} />
      <Bookmark className="left-menu-icon" size={24} />
      <Tv className="left-menu-icon" size={24} />
      <Clock className="left-menu-icon" size={24} />
      <ShoppingCart className="left-menu-icon" size={24} />
    </div>
  );
};

export default Sidebar;
