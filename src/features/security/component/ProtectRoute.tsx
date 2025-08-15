//check if content is allowed to visit route, if not than rollback to default route

import Authorized from "./Authorized.tsx";
import {Outlet} from "react-router";

export default function ProtectRoute(props: ProtectRouteProps){
    return (
        <Authorized authorized={<Outlet/>} claims={props.claims} notAuthorized={<>Not allowed to see this content</>} />
    )
}

interface ProtectRouteProps{
    claims: string[]
}