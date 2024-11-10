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
                <img src={flipdotLogo} width="60%" style={
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
                <button onClick={auth.login}>Anmelden</button>
            </div>
        </>
    )
}

export default Login
