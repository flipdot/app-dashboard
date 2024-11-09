import flipdotLogo from './assets/flipdot.svg'
import './App.css'
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login.tsx";
import {AuthProvider, useAuth} from "./AuthContext.tsx";
import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./Home.tsx";
import RequireAuth from "./RequireAuth.tsx";
import LoginCallback from "./LoginCallback.tsx";
import NavBar from "./NavBar.tsx";


function App() {

    return <AuthProvider>
        <NavBar/>
        <div id="content">
            <Routes>
                <Route element={<RequireAuth/>}>
                    <Route path="/" element={<Home/>}/>
                </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/login/callback" element={<LoginCallback/>}/>
            </Routes>
        </div>
    </AuthProvider>

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
