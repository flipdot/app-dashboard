import './App.css'
import {User, UserManager, WebStorageStateStore} from 'oidc-client-ts'
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {createContext, useContext, useEffect, useMemo, useState} from "react";

interface AuthContextType {
    user: undefined | null | User;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    loginCallback: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => {
        console.error("login not implemented. Did you forget to wrap your app in an AuthProvider?");
    },
    logout: async () => {
        console.error("logout not implemented. Did you forget to wrap your app in an AuthProvider?");
    },
    loginCallback: async () => {
        console.error("loginCallback not implemented. Did you forget to wrap your app in an AuthProvider?");
    }
});

const useAuth = () => useContext(AuthContext);

function AuthProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null | undefined>(undefined);
    const userManager = useMemo(() => new UserManager({
        authority: "https://login.flipdot.org/realms/flipdot",
        client_id: "flipdot-app-dashboard",
        redirect_uri: window.location.origin + "/login/callback",
        response_type: "code",
        userStore: new WebStorageStateStore({store: window.localStorage}),
    }), []);

    useEffect(() => {
        userManager.getUser().then(setUser);
    }, [userManager]);

    const loginCallback = async () => {
        setUser(await userManager.signinRedirectCallback());
    };
    const login = async () => {
        await userManager.signinRedirect();
        setUser(await userManager.getUser());
    }
    const logout = async () => {
        // only logout in this application, not on the oidc server
        await userManager.revokeTokens();
        await userManager.removeUser();
        setUser(null);
    }

    const value = {user, login, logout, loginCallback};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export {useAuth, AuthProvider};
