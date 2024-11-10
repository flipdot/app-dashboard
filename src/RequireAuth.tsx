import {useAuth} from "./AuthContext.tsx";
import {Navigate} from "react-router-dom";

function RequireAuth({children}: { children: React.ReactNode }) {
    const auth = useAuth();
    const notLoggedIn = auth.user === undefined || auth.user === null;
    return notLoggedIn ? <Navigate to="/login" replace/> : children;
}

export default RequireAuth