import fdLogo from './assets/fd.svg';
import "./NavBar.css";
import {Link} from "react-router-dom";
import Spinner from "./Spinner.tsx";
import {useAuth} from "react-oidc-context";

function NavBar() {
    const auth = useAuth();
    const loginButton = <button className="login-button" onClick={() => auth.signinRedirect()}>Login</button>
    const userMenu = <>
        <span className="title" style={{
            lineHeight: "1.1em",
            overflow: "hidden",
            textAlign: "right",
        }}>{auth.user?.profile.preferred_username}</span>
        <ul>
            <li>
                <button onClick={async () => {
                    await auth.revokeTokens();
                    await auth.removeUser();
                    // user becomes undefined, which can lead to infinite loading spinners
                    // in other parts of the application.
                    // Therefore, let's just reload the application
                    window.location.reload()
                }}>Logout
                </button>
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
            <ul className="nav-links">
                {/*<li><Link to="/">Home</Link></li>*/}
                <li>{rightItem}</li>
            </ul>
        </nav>
    )
}

export default NavBar;