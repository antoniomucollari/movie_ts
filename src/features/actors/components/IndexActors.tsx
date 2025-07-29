import {NavLink} from "react-router";

export default function IndexActors() {
    return (
        <>
            <h3>Actors</h3>
            <NavLink className="btn btn-primary" to='/actors/create'>Create Actor</NavLink>
        </>
    )
}