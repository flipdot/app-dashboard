import {useAuth} from "./AuthContext.tsx";
import {useState} from "react";

function LoginCallback() {
    const auth = useAuth();
    const [error, setError] = useState<string | null>(null);
    auth.loginCallback().then(() => {
            console.log("logged in");
        }
    ).catch(
        (e) => {
            // console.error(e);
            setError(`Error: ${e.message}`);
        }
    );
    return <div>
        <p>Logging in…</p>
        <pre>{error}</pre>
    </div>;
}

export default LoginCallback;