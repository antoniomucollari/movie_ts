import {NavLink} from "react-router";
import Button from "../../../components/Button.tsx";
import customConfirm from "../../../utils/customConfirm.ts";
import Authorized from "../../security/component/Authorized.tsx";
import {useContext} from "react";
import AuthenticationContext from "../../security/utils/AuthenticationContext.ts";
import {logout} from "../../security/utils/HandleJWT.ts";

export default function Menu(){
    const {claims,update} = useContext(AuthenticationContext)
    function getUserName(){
        return claims.filter(x => x.name ==='name')[0]?.value
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">React Movies</NavLink>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/movies/filter" className="nav-link">Filter Movies</NavLink>
                        </li>
                        <Authorized authorized={<>
                            <li className="nav-item">
                                <NavLink to="/actors" className="nav-link">Actors</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/genres" className="nav-link">Genres</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/theaters" className="nav-link">Theaters</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/movies/create" className="nav-link">Create Movie</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/users" className="nav-link">Users</NavLink>
                            </li>
                        </>}/>


                    </ul>

                    <div className="d-flex">
                        <Authorized claims={["isadmin"]} authorized={<>
                            <span className="nav-link">Hello, {getUserName()}</span>
                            <Button className="nav-link btn btn-link ms-2 logout-btn" onClick={()=>{
                                logout();
                                update([]);
                            }}>Logout</Button>
                        </>}
                        notAuthorized={
                            <>
                                <NavLink to="/register" className="navlink btn btn-link">Register</NavLink>
                                <NavLink to="/login" className="navlink btn btn-link ms-2">Login</NavLink>
                            </>
                        }/>
                    </div>
                </div>
            </div>
        </nav>

    )
}