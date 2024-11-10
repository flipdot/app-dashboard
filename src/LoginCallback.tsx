import {useAuth} from "./AuthContext.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function LoginCallback() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    auth.loginCallback().then(() => {
            navigate("/", {replace: true});
        }
    ).catch(
        (e) => {
            navigate("/login", {replace: true});
        }
    );
    return <div>
        <p>Logging in…</p>
        <pre className="error-box">{error}</pre>
    </div>;
}

export default LoginCallback;