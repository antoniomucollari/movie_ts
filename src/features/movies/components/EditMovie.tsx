import {useParams} from "react-router";
import {useEffect, useState} from "react";
import type {SubmitHandler} from "react-hook-form";
import Loading from "../../../components/Loading.tsx";
import type MovieCreation from "../models/MovieCreation.model.ts";
import MovieForm from "./MovieForm.tsx";


export default function EditMovies() {
    const [model, setModel] = useState<MovieCreation | undefined>(undefined);
    const {id} = useParams()
    useEffect(() => {
        const timerId = setTimeout(()=>{
            setModel({title:'Inside Job', releaseDate:'2010-10-08', trailer: "https://www.youtube.com/watch?v=FzrBurlJUNk&pp=0gcJCfwAo7VqN5tD", picture: 'https://m.media-amazon.com/images/M/MV5BMTQ3MjkyODA2Nl5BMl5BanBnXkFtZTcwNzQxMTU4Mw@@._V1_.jpg'})
        },800);
        return () => {clearTimeout(timerId);}
    }, [id]);
    const onSubmit : SubmitHandler<MovieCreation> = async (data) =>{
        await new Promise(resolve => setTimeout(resolve, 700));
        console.log(data)
    }
    return (
        <>
            <h3>Edit Movie with id:  {id}</h3>
            {model? <MovieForm onSubmit={onSubmit} model={model} /> : <Loading/>}
        </>
    )
}