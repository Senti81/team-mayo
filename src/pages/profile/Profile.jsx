import ProfileDetails from "../../components/ProfileDetails"
import Logout from '../../components/Logout'
const Profile = () => {
  return (
    <div className="container">
      <ProfileDetails />
      <hr className="my-3"/>
      <div className="row">
        <Logout />
      </div>    
    </div>
  )
}

export default Profile