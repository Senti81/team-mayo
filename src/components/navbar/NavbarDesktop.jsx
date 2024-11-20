import { NavLink } from "react-router-dom"

const NavbarDesktop = () => (
  <ul className="navbar-nav flex-row d-none d-sm-flex">
    <li className='nav-item'>
      <NavLink className={({ isActive }) => `nav-link ${isActive ? 'border-bottom border-black border-1' : ''}`} to="/transactions">
        Aktuelle Ausgaben
      </NavLink>              
    </li>
    <li className="nav-item">
      <NavLink className={({ isActive }) => `nav-link ${isActive ? 'border-bottom border-black border-1' : ''}`} to="/items">
        Einkaufsliste
      </NavLink>
    </li>         
    <li className="nav-item">
      <NavLink className={({ isActive }) => `nav-link ${isActive ? 'border-bottom border-black border-1' : ''}`} to="/receipts">
        Rezepte
      </NavLink>
    </li>
  </ul>
)

export default NavbarDesktop