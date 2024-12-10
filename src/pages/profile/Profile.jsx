import ProfileDetails from "../../components/ProfileDetails"
import Logout from '../../components/Logout'
import ShoppingListItems from "../../components/ShoppingListItems"
import useAuth from "../../hooks/useAuth"

const Profile = () => {
  const { isAdmin }  = useAuth()

  return (
    <div className="container">
      <ProfileDetails />
      <hr className="my-3"/>
      <div className="row">
        {isAdmin && <ShoppingListItems />}
        <Logout />
      </div>    
    </div>
  )
}

export default Profile