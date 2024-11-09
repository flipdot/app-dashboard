import {useAuth} from "./AuthContext.tsx";
import fdLogo from './assets/fd.svg';
import "./NavBar.css";
import {Link} from "react-router-dom";

function NavBar() {
    const auth = useAuth();
    const loginButton = <li>
        <button className="login-button" onClick={auth.login}>Login</button>
    </li>;
    const userMenu = <li>
        <span className="title">{auth.user?.profile.preferred_username}</span>
        <ul>
            <li>
                <button onClick={auth.logout}>Logout</button>
            </li>
        </ul>
    </li>
    const rightItem = auth.user ? userMenu : loginButton;
    return (
        <nav className="navbar">
            <Link to="/" className="logo"><img src={fdLogo} alt="small flipdot logo"/></Link>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                {rightItem}
            </ul>
        </nav>
    )
}

export default NavBar;