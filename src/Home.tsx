import './App.css'
import useSWR from "swr";
import Spinner from "./Spinner.tsx";
import AppCard, {OIDCApplication} from "./AppCard.tsx";

function Home() {

    const {data, error, isLoading} = useSWR<OIDCApplication[]>('https://login.flipdot.org/realms/flipdot/account/applications');

    if (isLoading) {
        return <Spinner size="lg"/>
    }

    if (error || !Array.isArray(data)) {
        return <p>Anwendungen konnten nicht geladen werden.</p>
    }

    function isSpaceUrl(url: string): boolean {
        return url.endsWith("flipdot.space") || url.endsWith(".fd");
    }

    const vpnOnlyData = data.filter((app: OIDCApplication) => isSpaceUrl(app.rootUrl));
    const internetData = data.filter((app: OIDCApplication) => !isSpaceUrl(app.rootUrl));

    const internetApps = <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "1.5em",
        margin: "1em 0",
        justifyContent: "center",
    }}>
        {internetData.map((app: OIDCApplication) => <AppCard key={app.clientId} app={app}/>)}
    </div>

    const vpnApps = <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "1.5em",
        margin: "1em 0",
        justifyContent: "center",
    }}>
        {vpnOnlyData.map((app: OIDCApplication) => <AppCard key={app.clientId} app={app}/>)}
    </div>

    return (
        <>
            {internetApps}
            <hr/>
            <h2>Nur im flipdot-Netz verfügbar:</h2>
            {vpnApps}
        </>)
}

export default Home
