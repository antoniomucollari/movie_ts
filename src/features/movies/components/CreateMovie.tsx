import type {SubmitHandler} from "react-hook-form";
import MovieForm from "./MovieForm.tsx";
import type MovieCreation from "../models/MovieCreation.model.ts";


export default function CreateMovie() {
    const onSubmit : SubmitHandler<MovieCreation> = async (data) =>{
        await new Promise(resolve => setTimeout(resolve, 700));
        console.log(data)
    }

    return (
        <>
            <h3>Create Movie</h3>
            <MovieForm onSubmit={onSubmit}/>

        </>
    )
}