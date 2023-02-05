import { Authvalue } from "../Context/AuthProvider";

const Profile = () => {
    const userdata = Authvalue();
    return ( 
        <div>
            <h2>{userdata.name}</h2>
            <h2>{userdata.email}</h2>
            <h2>{userdata.phoneNumber}</h2>
        </div>
     );
}
 
export default Profile;