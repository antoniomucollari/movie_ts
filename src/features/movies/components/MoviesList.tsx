import type Movie from "../models/movie.model.ts";
import DisplayMovies from "./DisplayMovies.tsx";
import GenericList from "../../../components/GenericList.tsx";
// import {ClipLoader} from "react-spinners"; loadingUI={<ClipLoader size={40} color="#36d7b7" />}

export default function MoviesList(props:MoviesListProps){
    return (
        <GenericList list={props.movies} >
        <div>
            {props.movies?.map(movie => <DisplayMovies key={movie.id} movie={movie}/> )}
        </div>
    </GenericList>
    )
}

interface MoviesListProps{
    movies?: Movie[];
}