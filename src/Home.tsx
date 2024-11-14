import './App.css'
import useSWR from "swr";
import Spinner from "./Spinner.tsx";
import AppCard, {OIDCApplication} from "./AppCard.tsx";

function Home() {

    const {data, isLoading} = useSWR('https://login.flipdot.org/realms/flipdot/account/applications');

    const content = <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "1.5em",
        margin: "1em 0",
        justifyContent: "center",
    }}>
        {data?.map((app: OIDCApplication) => <AppCard key={app.clientId} app={app}/>)}
    </div>

    return (
        <>
            {isLoading ? <Spinner size="lg"/> : content}
        </>
    )
}

export default Home
