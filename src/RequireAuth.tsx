import {useAuth} from "./AuthContext.tsx";
import {Navigate, useLocation} from "react-router-dom";

function RequireAuth({children}: { children: React.ReactNode }) {
    const auth = useAuth();
    const location = useLocation();
    const notLoggedIn = auth.user === undefined || auth.user === null;
    return notLoggedIn ? <Navigate to="/login" replace state={{from: location}}/> : children;
}

export default RequireAuth