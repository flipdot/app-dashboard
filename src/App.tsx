import './App.css'
import Login from "./Login.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./Home.tsx";
import NavBar from "./NavBar.tsx";
import {useAuth} from "react-oidc-context";

import NotFound from "./NotFound.tsx";

function App() {

    const {user} = useAuth();

    const AnonRoutes = <>
        <Route path="/" element={<Navigate to="/login"/>}/>
    </>

    const LoggedInRoutes = <>
        <Route path="/" element={<Home/>}/>
    </>

    return <>
        <NavBar/>
        <div id="content">
            <Routes>
                <>
                    {user === undefined ? null : user ? LoggedInRoutes : AnonRoutes}
                </>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
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
