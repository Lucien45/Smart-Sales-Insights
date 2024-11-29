import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../assets/css/layout.css';
import Sidebar from './Sidebar';
import NavBar from './NavBar';

export const Layout: React.FC = () => {

  return (
    <div className="layout-container">
      <NavBar/>
      <div className="layout-body">
        <Sidebar/>
        <div className="layout-content">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};