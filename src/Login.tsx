import flipdotLogo from './assets/flipdot.svg'
import './App.css'
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useAuth} from "react-oidc-context";


function Login() {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.user) {
            navigate("/", {replace: true});
        }
    }, [auth, navigate]);

    return (
        <>
            <div>
                <img src={flipdotLogo} height="100em" style={
                    {
                        margin: "auto",
                        display: "block",
                        padding: "20px",
                        filter: "drop-shadow(0px 0px 10px #555)"
                    }
                } alt="flipdot"/>
            </div>
            <h1>app dashboard</h1>
            <div className="card">
                <p>
                    Schnellzugriff auf alle flipdot Apps für Mitglieder
                </p>
                <button onClick={() => auth.signinRedirect()}>Anmelden</button>
            </div>
        </>
    )
}

export default Login
