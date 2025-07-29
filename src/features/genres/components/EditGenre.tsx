import {useParams} from "react-router";
import type {SubmitHandler} from "react-hook-form";
import type CreateGenreModel from "../models/CreateGenre.model.ts";
import GenreForm from "./GenreForm.tsx";
import {useEffect, useState} from "react";
import Loading from "../../../components/Loading.tsx";

export default function EditGenre() {
    const [model, setModel] = useState<CreateGenreModel | undefined>();
    const onSubmit : SubmitHandler<CreateGenreModel> = async (data) =>{
        await new Promise(resolve => setTimeout(resolve, 700));
        console.log(data)
    }
    const {id} = useParams()
    useEffect(()=>{
        const timerId = setTimeout(()=>{
            setModel({name: 'Drama' + id})
        },1000);
        return () => clearTimeout(timerId);
    },[])
    return (
        <>
            <h3>Edit Genre</h3>
            {model ? <GenreForm onSubmit={onSubmit} model={model}/> : <Loading/>}
        </>
    )
}