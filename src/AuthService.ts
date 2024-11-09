import {UserManager} from "oidc-client-ts";

export default class AuthService {
    private userManager: UserManager;

    constructor() {
        this.userManager = new UserManager({
            authority: "https://login.flipdot.org/realms/flipdot",
            client_id: "flipdot-app-dashboard",
            redirect_uri: window.location.origin + "/login/callback",
            response_type: "code",
        })
    }

    getUser() {
        return this.userManager.getUser();
    }

    login() {
        return this.userManager.signinRedirect();
    }

    loginCallback() {
        return this.userManager.signinRedirectCallback();
    }

    logout() {
        // only logout in this application, not on the oidc server
        return this.userManager.revokeTokens().then(() => {
            return this.userManager.removeUser();
        });
    }
}
