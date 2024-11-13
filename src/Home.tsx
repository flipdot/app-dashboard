import './App.css'
import useSWR from "swr";

function Home() {

    const res = useSWR('https://login.flipdot.org/realms/flipdot/account/applications');

    return (
        <>
            <div className="card">
                <pre style={{
                    fontSize: "0.7em",
                    textAlign: "left",
                }}>
                    {JSON.stringify(res, null, 2)}
                </pre>
                <a href="https://github.com/flipdot/app-dashboard/">https://github.com/flipdot/app-dashboard</a>
            </div>
        </>
    )
}

export default Home
