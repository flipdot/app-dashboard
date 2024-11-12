import {useAuth} from "./AuthContext.tsx";
import fdLogo from './assets/fd.svg';
import "./NavBar.css";
import {Link} from "react-router-dom";
import Spinner from "./Spinner.tsx";

function NavBar() {
    const auth = useAuth();
    const loginButton = <button className="login-button" onClick={auth.login}>Login</button>
    const userMenu = <>
        <span className="title" style={{
            lineHeight: "1.1em",
            overflow: "hidden",
            textAlign: "right",
        }}>{auth.user?.profile.preferred_username}</span>
        <ul>
            <li>
                <button onClick={auth.logout}>Logout</button>
            </li>
        </ul>
    </>
    const alignedSpinner = <span style={{
        textAlign: "right",
    }}><Spinner/></span>
    const rightItem = auth.user === undefined ? alignedSpinner : auth.user ? userMenu : loginButton;
    return (
        <nav className="navbar">
            <Link to="/" className="logo"><img src={fdLogo} alt="fd" onError={
                (e) => {
                    e.currentTarget.style.backgroundColor = "#f5c600";
                }
            } onLoad={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
            }}/></Link>
            {/*<Link to="/" className="logo"><img src="broken" alt="fd"/></Link>*/}
            <ul className="nav-links">
                {/*<li><Link to="/">Home</Link></li>*/}
                <li>{rightItem}</li>
            </ul>
        </nav>
    )
}

export default NavBar;