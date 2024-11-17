import "./AppCards.css"
import Markdown from "react-markdown";

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

    // replace characters from the client URL that are not suitable for urls or file names
    const filename = app.clientId.replace(/[^a-zA-Z0-9.-]/g, "_");

    const logoUrl = `/logos/${filename}.svg`;

    const appImg = <img src={logoUrl} alt="App Icon" onError={e => {
        e.currentTarget.src = "/fd.svg"
    }}/>;
    const cardTitle = <h2>{app.clientName || app.clientId}</h2>;
    const linkedCardTitle = <a href={app.effectiveUrl} target="_blank" className="app-card-header">
        {cardTitle}
    </a>;
    const linkedAppImg = <a href={app.effectiveUrl} target="_blank">{appImg}</a>;
    return <div className="app-card">
        {app.effectiveUrl ? linkedCardTitle : <span className="app-card-header">{cardTitle}</span>}
        <div className="app-card-body">
            <div className="text">
                <Markdown
                    components={{
                        a: ({...props}) => <a {...props} target="_blank">
                            {props.children}
                        </a>
                    }}
                >{app.description}</Markdown>
            </div>
            <div className="image">
                {app.effectiveUrl ? linkedAppImg : appImg}
            </div>
        </div>
        <div className="app-card-footer">
            <span>{app.rootUrl}</span>
            {app.effectiveUrl ?
                <button onClick={() => window.open(app.effectiveUrl, "_blank")}>Öffnen</button> : <span>
                Client ID: <code>{app.clientId}</code>
            </span>}
        </div>
    </div>
}

export default AppCard
export type {OIDCApplication};