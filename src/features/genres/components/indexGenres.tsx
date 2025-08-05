import {NavLink} from "react-router";
import {useEffect} from "react";
import apiClient from "../../../api/apiClient.ts";

export default function IndexGenres(){

    useEffect(()=>{
        apiClient.get(`/Genre`).then(res=> console.log(res.data))
    },[])
    return (
        <>
            <h3>genres</h3>
            <NavLink className="btn btn-primary" to='/genres/create'>Create Genre</NavLink>
        </>
    )
}