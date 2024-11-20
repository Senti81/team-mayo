import { NavLink } from "react-router-dom"

const NavbarProfile = ({ user }) => (
  <ul className='navbar-nav ms-auto'>
    <li className="nav-item d-none d-sm-block">
      <NavLink className={({ isActive }) => `nav-link ${isActive ? 'border-bottom border-black border-1' : ''}`} to="profile">
        Mein Profil
      </NavLink> 
    </li>
    <li className="nav-item d-block d-sm-none">
      <NavLink className="nav-link px-3" to="profile">
        <img
          src={user?.photoURL}
          alt="profilePic"
          className="profile-pic"
          style={{ width: '30px', height: '30px', borderRadius: '50%' }}
        />
      </NavLink>
    </li>
  </ul>
)

export default NavbarProfile