import type Movie from "../models/movie.model.ts";
import DisplayMovies from "./DisplayMovies.tsx";
// import GenericList from "../../../components/GenericList.tsx";
// import {ClipLoader} from "react-spinners"; loadingUI={<ClipLoader size={40} color="#36d7b7" />}
import styles from './DisplayMovie.module.css'
export default function MoviesList(props:MoviesListProps){
    return (
        // <GenericList list={props.movies} >
        <div className={styles.container}>
            {props.movies?.map(movie => <DisplayMovies key={movie.id} movie={movie}/> )}
        </div>
    // </GenericList>
    )
}

interface MoviesListProps{
    movies?: Movie[];
}