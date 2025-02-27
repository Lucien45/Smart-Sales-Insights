import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../assets/css/layout.css';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { closeMenu, openMenu} from '../../redux/toggleMenuSlice';
import { Menu, X } from "lucide-react";


export const Layout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.toggleMenu.isOpen);

  return (
    <div className="layout-container">
      <NavBar/>
      <div className="layout-body flex flex-col md:flex-row">
        {
          isOpen && <X onClick={() => {dispatch(closeMenu())}}/> 
        }
        {
          !isOpen && <Menu onClick={() => {dispatch(openMenu())}}/> 
        }
        {
          isOpen &&
          <Sidebar/>
        }
        <div className="layout-content p-2 md:p-4">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

