import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './main.css'
import App from './App.tsx'

import * as Sentry from "@sentry/react";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./AuthContext.tsx";

Sentry.init({
    dsn: "https://7976fc906df26e2865ad329d909f52f5@sentry.flipdot.org/6",
    allowUrls: [/https:\/\/apps\.flipdot\.org/],
    integrations: [Sentry.captureConsoleIntegration()],
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
)
