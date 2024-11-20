import { NavLink } from "react-router-dom"

const NavbarMobile = () => (
  <ul className="navbar-nav flex-row d-flex d-sm-none">
    <li className="nav-item">
      <NavLink className={({ isActive }) => `nav-link rounded px-3 ${isActive ? 'bg-secondary text-light' : ''}`} to="/transactions">
        <i className="bi bi-currency-euro" />
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className={({ isActive }) => `nav-link rounded px-3 ${isActive ? 'bg-secondary text-light' : ''}`} to="/items">
        <i className="bi bi-cart" />                 
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className={({ isActive }) => `nav-link rounded px-3 ${isActive ? 'bg-secondary text-light' : ''}`} to="/receipts">
        <i className="bi bi-receipt" />
      </NavLink>
    </li>
  </ul>
)

export default NavbarMobile