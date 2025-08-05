
import type {SubmitHandler} from "react-hook-form";
import type CreateGenreModel from '../models/CreateGenre.model';
import GenreForm from "./GenreForm.tsx";
import apiClient from "../../../api/apiClient.ts";
import {useNavigate} from "react-router";
import extractErrors from "../../../utils/extractErrors.ts";
import type {AxiosError} from "axios";
import {useState} from "react";
export default function CreateGenre() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);
    const onSubmit : SubmitHandler<CreateGenreModel> = async (data) =>{
        try{
            await apiClient.post("/Genre", data);
            navigate("/genres");
        }catch(error){
            const errors = extractErrors(error as AxiosError);
            setErrors(errors);
        }
    }

    return (
        <>
            <h3>Create Genre</h3>
            <GenreForm errors={errors} onSubmit={onSubmit}/>

        </>
    )
}
