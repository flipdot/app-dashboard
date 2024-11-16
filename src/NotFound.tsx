import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useAuth} from "react-oidc-context";

function NotFound() {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate("/login", {replace: true});
        }
    }, [auth, navigate]);

    return <div>
        <h1>404</h1>
        <p>Page not found</p>
    </div>
}

export default NotFound