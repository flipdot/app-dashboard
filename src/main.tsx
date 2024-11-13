import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './main.css'
import App from './App.tsx'

import * as Sentry from "@sentry/react";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider, AuthProviderProps} from "react-oidc-context";
import AuthenticatedSWRConfig from "./AuthenticatedSWRConfig.tsx";
import {WebStorageStateStore} from "oidc-client-ts";

if (import.meta.env.PROD) {
    Sentry.init({
        dsn: "https://7976fc906df26e2865ad329d909f52f5@sentry.flipdot.org/6",
        allowUrls: [/https:\/\/apps\.flipdot\.org/],
        integrations: [Sentry.captureConsoleIntegration()],
    });
}

const oidcConfig = {
    authority: "https://login.flipdot.org/realms/flipdot",
    client_id: "flipdot-app-dashboard",
    redirect_uri: window.location.origin + "/login",
    post_logout_redirect_uri: window.location.origin + "/login/callback",
    response_type: "code",
    userStore: new WebStorageStateStore({store: window.localStorage}),
} satisfies AuthProviderProps;

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider {...oidcConfig}>
                <AuthenticatedSWRConfig>
                    <App/>
                </AuthenticatedSWRConfig>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
)
