import {useAuth} from "./AuthContext.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

function NotFound() {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (auth.user === null) {
            navigate("/login", {replace: true, state: {from: location}});
        }
    }, [auth, navigate, location]);

    if (auth.user === undefined) {
        // avoids flickering
        return <div></div>
    }

    return <div>
        <h1>404</h1>
        <p>Page not found</p>
    </div>
}

export default NotFound