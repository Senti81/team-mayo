import React from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import NavbarDesktop from './navbar/NavbarDesktop';
import NavbarMobile from './navbar/NavbarMobile';
import NavbarProfile from './navbar/NavbarProfile';
import NavbarBrand from './navbar/NavbarBrand';

const Navbar = () => {
  const { user } = useAuth()
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-sm bg-body-tertiary">
        <div className='container-fluid'>
          <div className="navbar-collapse d-flex align-items-center justify-content-between" id="navbarNav">
            <NavbarBrand />
            <NavbarDesktop />
            <NavbarMobile />
            <NavbarProfile user={user} />
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: '75px'}}>
        <Outlet />
      </div>
    </>
  )
};

export default Navbar;
