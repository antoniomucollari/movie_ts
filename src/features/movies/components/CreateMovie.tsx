import type {SubmitHandler} from "react-hook-form";
import MovieForm from "./MovieForm.tsx";
import type MovieCreation from "../models/MovieCreation.model.ts";
import type FilterMoviesDTO from "../../genres/models/Genre.model.ts";
import type Theater from "../../theters/models/Theater.model.ts";


export default function CreateMovie() {
    const onSubmit : SubmitHandler<MovieCreation> = async (data) =>{
        await new Promise(resolve => setTimeout(resolve, 700));
        console.log(data)
    }
    const nonSelectedGenres: FilterMoviesDTO[] = [{id:1, name: 'Action'}, {id: 22, name: 'Drama'}]
    const nonSelectedTheaters: Theater[] = [{id:1, name: 'Cineplexx', latitude: 12, longitude: 12}, {id:2, name: 'Millennium', latitude: 12, longitude: 12}]
    return (
        <>
            <h3>Create Movie</h3>
            <MovieForm nonSelectedTheaters={nonSelectedTheaters} selectedTheaters={[]} selectedGenres={[]} nonSelectedGenres={nonSelectedGenres} onSubmit={onSubmit}/>

        </>
    )
}