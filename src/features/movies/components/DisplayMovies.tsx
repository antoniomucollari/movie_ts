import type Movie from "../models/movie.model.ts";
import styles from './DisplayMovie.module.css'
import {NavLink} from "react-router";
import Button from "../../../components/Button.tsx";
import customConfirm from "../../../utils/customConfirm.ts";
import apiClient from "../../../api/apiClient.ts";
import AlertContext from "../../../utils/AlertContext.ts";
import {useContext} from "react";
import Authorized from "../../security/component/Authorized.tsx";
export default function DisplayMovies(props: DisplayMoviesProps) {
    const buildLink = ()=> `/movie/${props.movie.id}`

    async function deleteMovie(){
        await  apiClient.delete(`/movies/${props.movie.id}`)
        alert()
    }
    const alert = useContext(AlertContext)
    return (
        <div className={styles.div}>
            <NavLink to={buildLink()}>
                <img src={props.movie.poster} alt="Poster image" />
            </NavLink>
            <p>
                <a href={buildLink()}>{props.movie.title}</a>
            </p>
            <div>
                <Authorized authorized={<><NavLink to={`/movies/edit/${props.movie.id}`} className="btn btn-primary">Edit</NavLink>
                    <Button className="btn btn-danger ms-4" onClick={()=>customConfirm(()=>deleteMovie())}>Delete</Button></>}
                            claims={['isadmin']}></Authorized>

            </div>
        </div>
    )
}

interface DisplayMoviesProps {
    movie: Movie;
}