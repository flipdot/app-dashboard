import './App.css'
import Login from "./Login.tsx";
import {Route, Routes} from "react-router";
import Home from "./Home.tsx";
import NavBar from "./NavBar.tsx";
import {hasAuthParams, useAuth} from "react-oidc-context";

import NotFound from "./NotFound.tsx";
import {useEffect, useRef} from "react";
import Spinner from "./Spinner.tsx";

function App() {

    const auth = useAuth();
    const hasTriedSignin = useRef(false);

    useEffect(() => {
        // from https://github.com/authts/react-oidc-context?tab=readme-ov-file#automatic-sign-in
        if (!hasAuthParams() &&
            !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading &&
            !hasTriedSignin.current && auth.user
        ) {
            auth.signinSilent();
            hasTriedSignin.current = true;
        }
    }, [auth, ]);

    if (auth.isLoading) {
        return <>
            <NavBar/>
            <div id="content"><Spinner size="lg"></Spinner></div>
        </>
    }

    const LoggedInRoutes = <>
        <Route path="/" element={<Home/>}/>
    </>

    return <>
        <NavBar/>
        <div id="content">
            <Routes>
                <>
                    {auth.isAuthenticated ? LoggedInRoutes : null}
                </>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    </>
}

export default App
