import {useAuth} from "./AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Spinner from "./Spinner.tsx";

function LoginCallback() {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        auth.loginCallback().then(() => {
            navigate("/", {replace: true});
        }).catch(() => {
            console.error("Login callback failed");
            navigate("/login", {replace: true});
        });
    });

    return <Spinner size="lg"/>;
}

export default LoginCallback;