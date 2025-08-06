import {useNavigate, useParams} from "react-router";
import type {SubmitHandler} from "react-hook-form";
import type CreateGenreModel from "../models/CreateGenre.model.ts";
import GenreForm from "./GenreForm.tsx";
import {useEffect, useState} from "react";
import Loading from "../../../components/Loading.tsx";
import apiClient from "../../../api/apiClient.ts";
import type Genre from "../models/Genre.model.ts";
import extractErrors from "../../../utils/extractErrors.ts";
import * as axios from "axios";
import type {AxiosError} from "axios";

export default function EditGenre() {
    const [errors, setErrors] = useState<string[]>([]);
    const navitgate = useNavigate();
    const [model, setModel] = useState<CreateGenreModel | undefined>();
    const {id} = useParams()
    useEffect(()=>{
        apiClient.get<Genre>(`/genre/${id}`).then(res=>{
            setModel(res.data)
        })
    },[])
    const onSubmit : SubmitHandler<CreateGenreModel> = async (data) =>{
        try{
            await apiClient.put(`/genre/${id}`, data);
            navitgate(`/genres`)
        }
        catch(err){
            const errors = extractErrors(err as AxiosError);
            setErrors(errors);
        }
    }
    return (
        <>
            <h3>Edit Genre</h3>
            {model ? <GenreForm errors={errors} onSubmit={onSubmit} model={model}/> : <Loading/>}
        </>
    )
}