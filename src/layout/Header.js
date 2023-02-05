import {Link} from "react-router-dom"
import { Authvalue, AuthvalueAction } from "../Context/AuthProvider";

const Headerpage = () => {
    const userdata = Authvalue();
    const setAuth = AuthvalueAction()

    const exithandler = () => {
        setAuth(false);
        localStorage.setItem("Auth" , JSON.stringify(false))
    }
    return ( 
        <header>
            <nav>
                <ul className="navbar">
                    <Link to="/"><li>Homepage</li></Link>
                    <Link to="/cartpage"><li>Cartpage</li></Link>
                    {userdata ? null : <Link to="/login"><li>Log in</li></Link>}
                    {userdata ? null : <Link to="/signup"><li>sign up</li></Link>}
                    {userdata ? <Link to="/profile"><li>profile</li></Link> : null}
                    {userdata ? <Link className="exit" onClick={exithandler}>exit</Link> : null}
                </ul>
            </nav>
        </header>
     );
}
 
export default Headerpage;