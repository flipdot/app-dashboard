import flipdotLogo from './assets/flipdot.svg'
import './App.css'
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
import React from "react";


function Home() {

    // const auth = useAuth();

    return (
        <>
            <div className="card">
                <p>
                    Hier würdest du jetzt eine Liste alle flipdot Apps sehen.
                    Ich bin aber noch nicht fertig, sorry :)
                </p>
                <p>
                    Übrigens bleibt man auch noch nicht eingeloggt wenn man die Seite neu lädt.
                    Upsi.
                </p>
                <a href="https://github.com/flipdot/app-dashboard/">https://github.com/flipdot/app-dashboard</a>
            </div>
        </>
    )
}

export default Home
