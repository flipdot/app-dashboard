import "./AppCards.css"

type GrantedScope = {
    id: string;
    name: string;
    displayTest: string;
};

type Consent = {
    grantedScopes: GrantedScope[];
    createdDate: number;
    lastUpdatedDate: number;
};

type OIDCApplication = {
    clientId: string;
    clientName: string;
    description?: string;
    userConsentRequired: boolean;
    inUse: boolean;
    offlineAccess: boolean;
    rootUrl: string;
    baseUrl: string;
    effectiveUrl: string;
    consent?: Consent;
};

function AppCard({app}: { app: OIDCApplication }) {

    // convert text "@NICKNAME" to a link to `https://forum.flipdot.org/u/${nickname}`
    const description = app.description?.split(/(@\w+)/g).map((part, index) => {
        if (part.startsWith("@")) {
            const nickname = part.slice(1);
            return <a key={index} href={`https://forum.flipdot.org/u/${nickname}`} target="_blank">{part}</a>;
        }
        return part;
    });

    return <div className="app-card">
        <a href={app.effectiveUrl} target="_blank" className="app-card-header">
            <h2>{app.clientName || app.clientId}</h2>
        </a>
        <div className="app-card-body">
            <div className="text">
                <p>{description}</p>
            </div>
            <div className="image">
                <a href={app.effectiveUrl} target="_blank"><img src="/fd.svg" alt="App Icon"/></a>
            </div>
        </div>
        <div className="app-card-footer">
            <span>{app.rootUrl}</span>
            {app.effectiveUrl ? <button onClick={() => window.open(app.effectiveUrl, "_blank")}>Öffnen</button> : <span>
                Client ID: <code>{app.clientId}</code>
            </span>}
        </div>
    </div>
}

export default AppCard
export type {OIDCApplication};