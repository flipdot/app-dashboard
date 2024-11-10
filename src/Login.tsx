import flipdotLogo from './assets/flipdot.svg'
import './App.css'
import {useAuth} from "./AuthContext.tsx";
import {useNavigate} from "react-router-dom";


function Login() {
    const auth = useAuth();
    const navigate = useNavigate();

    if (auth.user) {
        navigate("/", {replace: true});
    }

    return (
        <>
            <div>
                <img src={flipdotLogo} className="logo" alt="flipdot logo"/>
            </div>
            <h1>flipdot app dashboard</h1>
            <div className="card">
                <p>
                    Schnellzugriff auf alle flipdot Apps für Mitglieder
                </p>
                <button onClick={auth.login}>Anmelden</button>
            </div>
        </>
    )
}

export default Login
