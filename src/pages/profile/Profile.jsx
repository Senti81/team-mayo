import ProfileDetails from "../../components/ProfileDetails"
import Logout from '../../components/Logout'
import ShoppingListItems from "../../components/ShoppingListItems"
import useAuth from "../../hooks/useAuth"

const Profile = () => {
  const { user }  = useAuth()

  const isAdmin = () => {
    return user.uid === process.env.REACT_APP_ADMIN_UID
  }

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