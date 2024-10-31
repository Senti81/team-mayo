import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import brand from '../icons/brand.png'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Erfolgreich abgemeldet");
    } catch (error) {
      console.error("Fehler beim Abmelden:", error.message);
    }
  };

  return (
    <nav className="navbar fixed-top navbar-expand-sm bg-body-tertiary">
      <div className='container-fluid'>
        <div className="navbar-collapse d-flex align-items-center justify-content-between" id="navbarNav">
          <a className="navbar-brand" href="/">
            <img src={brand} alt="Bootstrap" width="30" height="30"/>
          </a>
          <ul className="navbar-nav flex-row">
            <li className='nav-item active d-none d-sm-block'>
              <NavLink
                className={({ isActive }) => "nav-link" + (isActive ? " border-bottom border-black border-1" : "")}
                to="/transactions"
                end
                >
                Aktuelle Ausgaben
              </NavLink>              
            </li>
            <li className="nav-item d-none d-sm-block">
              <NavLink
                className={({ isActive }) => "nav-link" + (isActive ? " border-bottom border-black border-1" : "")}
                to="/items"
                end
                >
                Einkaufsliste
              </NavLink>
            </li>         
            <li className="nav-item d-none d-sm-block">
              <NavLink
                className={({ isActive }) => "nav-link" + (isActive ? " border-bottom border-black border-1" : "")}
                to="/receipts"
                end
                >
                Rezepte
              </NavLink>
            </li>
            <li className="nav-item d-block d-sm-none">
              <NavLink
                className={({ isActive }) => "nav-link" + (isActive ? " bg-secondary text-light rounded px-3" : " px-3")}
                to="/transactions"
                end
                >
                <i className="bi bi-currency-euro"></i>
              </NavLink>
            </li>
            <li className="nav-item d-block d-sm-none">
              <NavLink
                className={({ isActive }) => "nav-link" + (isActive ? " bg-secondary text-light rounded px-3" : " px-3")}
                to="/items"
                end
                >
                <i className="bi bi-card-checklist"></i>                  
              </NavLink>
            </li>
            <li className="nav-item d-block d-sm-none">
            <NavLink
                className={({ isActive }) => "nav-link" + (isActive ? " bg-secondary text-light rounded px-3" : " px-3")}
                to="/receipts"
                end
                >
                <i className="bi bi-lightbulb"></i>
              </NavLink>
            </li>
          </ul>
          <ul className='navbar-nav ms-auto'>
            <li className="nav-item d-none d-sm-block">
              <a className="nav-link text-danger" href="/" onClick={handleLogout}>Abmelden</a>
            </li>
            <li className="nav-item d-block d-sm-none">
              <i className="bi bi-box-arrow-right text-danger fs-3" onClick={handleLogout}/>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
};

export default Navbar;
