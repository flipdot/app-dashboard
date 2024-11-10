import {useAuth} from "./AuthContext.tsx";
import {useNavigate} from "react-router-dom";

function LoginCallback() {
    const auth = useAuth();
    const navigate = useNavigate();
    auth.loginCallback().then(() => {
            navigate("/", {replace: true});
        }
    ).catch(
        () => {
            navigate("/login", {replace: true});
        }
    );
    return <div>
        <p>Logging in…</p>
    </div>;
}

export default LoginCallback;