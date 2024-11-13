import './App.css'
import Login from "./Login.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./Home.tsx";
import NavBar from "./NavBar.tsx";
import {hasAuthParams, useAuth} from "react-oidc-context";

import NotFound from "./NotFound.tsx";
import {useEffect, useState} from "react";
import Spinner from "./Spinner.tsx";

function App() {

    const auth = useAuth();
    const [hasTriedSignin, setHasTriedSignin] = useState(false);

    useEffect(() => {
        if (!hasAuthParams() &&
            !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading &&
            !hasTriedSignin && auth.user
        ) {
            auth.signinSilent();
            setHasTriedSignin(true);
        }
    }, [auth, hasTriedSignin]);

    const AnonRoutes = <>
        <Route path="/" element={<Navigate to="/login"/>}/>
    </>

    const LoggedInRoutes = <>
        <Route path="/" element={<Home/>}/>
    </>

    return <>
        <NavBar/>
        <div id="content">
            {auth.isLoading ? <Spinner size="lg"></Spinner> : <Routes>
                <>
                    {auth.user === undefined ? null : auth.user ? LoggedInRoutes : AnonRoutes}
                </>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>}
        </div>
    </>

    // const auth = useAuth();
    // // let navigate = useNavigate();
    //
    // if (!auth.user) {
    //   return <Login />
    // }
    //
    //
    // return (
    //   <>
    //     <div>
    //         <img src={flipdotLogo} className="logo" alt="flipdot logo" />
    //     </div>
    //     <h1>flipdot app dashboard</h1>
    //     <div className="card">
    //       <p>
    //           TODO: List of apps go here
    //       </p>
    //     </div>
    //   </>
    // )
}

export default App
