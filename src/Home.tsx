import flipdotLogo from './assets/flipdot.svg'
import './App.css'
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
import React from "react";


function Home() {

    // const auth = useAuth();

    return (
        <>
            <div>
                <img src={flipdotLogo} className="logo" alt="flipdot logo"/>
            </div>
            <h1>flipdot app dashboard</h1>
            <div className="card">
                <p>
                    TODO: List of apps go here
                </p>
            </div>
        </>
    )
}

export default Home
