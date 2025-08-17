import {type ReactNode, useContext, useEffect, useState} from "react";
import AuthenticationContext from "../utils/AuthenticationContext.ts"
export default function Authorized(props: AuthorizedProps) {
    const [authorized, setAuthorized] = useState(false);
    const { claims } = useContext(AuthenticationContext);

    useEffect(() => {
        if (props.claims && props.claims.length > 0) {
            // check if *all required claims* exist in the user's claims
            const hasClaim = props.claims.every(requiredClaim =>
                claims.some(c => c.name === requiredClaim)
            );
            setAuthorized(hasClaim);
        } else {
            // fallback: just check if the user is logged in
            setAuthorized(claims.length > 0);
        }
    }, [claims, props.claims]);

    return (
        <>
            {authorized ? props.authorized : props.notAuthorized ?? <></>}
        </>
    );
}

interface AuthorizedProps {
    authorized: ReactNode;
    notAuthorized?: ReactNode;
    claims?: string[]; // <-- make it optional, since sometimes you just check "logged in"
}