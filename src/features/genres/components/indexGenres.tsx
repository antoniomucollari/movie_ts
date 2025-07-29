import {NavLink} from "react-router";

export default function IndexGenres(){
    return (
        <>
            <h3>genres</h3>
            <NavLink className="btn btn-primary" to='/genres/create'>Create Genre</NavLink>
        </>
    )
}