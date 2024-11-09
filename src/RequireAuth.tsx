import {useAuth} from "./AuthContext.tsx";
import {Navigate} from "react-router-dom";

function RequireAuth({children: children}: { children: React.ReactNode }) {
    const auth = useAuth();
    return auth.user === undefined ? <Navigate to="/login" replace/> : children;
}

export default RequireAuth