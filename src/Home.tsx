import './App.css'
import useSWR from "swr";
import Spinner from "./Spinner.tsx";
import AppCard, {OIDCApplication} from "./AppCard.tsx";

function Home() {

    const {data, isLoading} = useSWR('https://login.flipdot.org/realms/flipdot/account/applications');

    if (isLoading) {
        return <Spinner size="lg"/>
    }

    const vpnOnlyData = data.filter((app: OIDCApplication) => app.rootUrl.endsWith("flipdot.space"));
    const internetData = data.filter((app: OIDCApplication) => !app.rootUrl.endsWith("flipdot.space"));

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
