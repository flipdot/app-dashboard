import './App.css'
import {User} from 'oidc-client-ts'
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {createContext, useContext, useState} from "react";
import AuthService from "./AuthService.ts";

interface AuthContextType {
    user: null | User;
    login: () => void;
    logout: () => void;
    loginCallback: () => Promise<null | User>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => {
        console.error("login not implemented. Did you forget to wrap your app in an AuthProvider?");
    },
    logout: () => {
        console.error("logout not implemented. Did you forget to wrap your app in an AuthProvider?");
    },
    loginCallback: async () => {
        console.error("loginCallback not implemented. Did you forget to wrap your app in an AuthProvider?");
        return null;
    }
});

const useAuth = () => useContext(AuthContext);

function AuthProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(
        JSON.parse(
            sessionStorage.getItem("session") || "null"
        ) || undefined
    );

    const authService = new AuthService();

    const loginCallback = async () => {
        const authedUser = await authService.loginCallback();
        setUser(authedUser);
        return authedUser;
    };

    const login = () => authService.login();
    const logout = async () => {
        await authService.logout();
        setUser(null);
    }

    const value = {user, login, logout, loginCallback};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export {useAuth, AuthProvider};
