import {NavLink} from "react-router";

export default function IndexTheaters() {
    return (
        <>
            <h3>Theaters  </h3>
            <NavLink className="btn btn-primary" to='/theaters/create'>Create Theaters</NavLink>
        </>
    )
}