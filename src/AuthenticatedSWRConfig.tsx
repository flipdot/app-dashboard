import {PropsWithChildren} from "react";
import {SWRConfig} from "swr";
import {useAuth} from "react-oidc-context";

function AuthenticatedSWRConfig({children}: PropsWithChildren) {
    const auth = useAuth();

    return <SWRConfig
        value={{
            fetcher: async (resource, init) => {
                if (!auth.user) {
                    throw new Error("Not authenticated");
                }
                const res = await fetch(
                    resource, {
                        ...init, headers: {
                            ...init?.headers,
                            Authorization: `Bearer ${auth.user.access_token}`,
                            Accept: "application/json"
                        },
                        credentials: "include",
                    });
                return await res.json();
            }
        }}
    >
        {children}
    </SWRConfig>
}

export default AuthenticatedSWRConfig