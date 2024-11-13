import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useAuth} from "react-oidc-context";

function NotFound() {
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user === null) {
            navigate("/login", {replace: true, state: {from: location}});
        }
    }, [user, navigate, location]);

    if (user === undefined) {
        // avoids flickering
        return <div></div>
    }

    return <div>
        <h1>404</h1>
        <p>Page not found</p>
    </div>
}

export default NotFound