
import type {SubmitHandler} from "react-hook-form";
import type CreateGenreModel from '../models/CreateGenre.model';
import GenreForm from "./GenreForm.tsx";
export default function CreateGenre() {
    const onSubmit : SubmitHandler<CreateGenreModel> = async (data) =>{
        await new Promise(resolve => setTimeout(resolve, 700));
        console.log(data)
    }

    return (
        <>
            <h3>Create Genre</h3>
            <GenreForm onSubmit={onSubmit}/>

        </>
    )
}
