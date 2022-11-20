import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

export const SidebarMenu = () => {
  return (
    <div className="sidebar-menu p-2">
      <Link to="/" className="sidebar-menu-home-link d-block">
        <img src="/static/img/the-stitches-logo.svg" alt="The Stitches logo" />
      </Link>
      <Link to="/" className="sidebar-menu-home-link d-block">
        Hrát
      </Link>
      <Link to="/statistics" className="sidebar-menu-home-link d-block">
        Statistiky
      </Link>
    </div>
  );
};
