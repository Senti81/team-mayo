import { NavLink } from "react-router-dom"
import brand from '../../icons/brand.png'

const NavbarBrand = () => (
  <NavLink 
    className="navbar-brand"
    to="/"
  >
    <img
      src={brand}
      alt="Bootstrap"
      width="30"
      height="30"
    />
  </NavLink>
)

export default NavbarBrand