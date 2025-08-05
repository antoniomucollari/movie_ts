import {useParams} from "react-router";
import {useEffect, useState} from "react";
import type {SubmitHandler} from "react-hook-form";
import Loading from "../../../components/Loading.tsx";
import type MovieCreation from "../models/MovieCreation.model.ts";
import MovieForm from "./MovieForm.tsx";
import type Genre from "../../genres/models/Genre.model.ts";
import type Theater from "../../theters/models/Theater.model.ts";


export default function EditMovies() {
    const [model, setModel] = useState<MovieCreation | undefined>(undefined);
    const {id} = useParams()
    useEffect(() => {
        const timerId = setTimeout(()=>{
            setModel({title:'Inside Job', releaseDate:'2010-10-08', trailer: "https://www.youtube.com/watch?v=FzrBurlJUNk&pp=0gcJCfwAo7VqN5tD", picture: 'https://m.media-amazon.com/images/M/MV5BMTQ3MjkyODA2Nl5BMl5BanBnXkFtZTcwNzQxMTU4Mw@@._V1_.jpg'})
        },800);
        return () => {clearTimeout(timerId);}
    }, [id]);
    const nonSelectedGenres: Genre[] = [{id:1, name: 'Action'}]
    const selectedGenres: Genre[] = [{id:2, name: 'Drama'}]

    const nonSelectedTheaters: Theater[] = [{id:1, name: 'Cineplexx', latitude: 12, longitude: 12}]
    const selectedTheaters: Theater[] = [{id:2, name: 'Millennium', latitude: 12, longitude: 12}]
    const onSubmit : SubmitHandler<MovieCreation> = async (data) =>{
        await new Promise(resolve => setTimeout(resolve, 700));
        console.log(data)
    }
    return (
        <>
            <h3>Edit Movie with id:  {id}</h3>
            {model? <MovieForm selectedTheaters={selectedTheaters} nonSelectedTheaters={nonSelectedTheaters} onSubmit={onSubmit} model={model} nonSelectedGenres={nonSelectedGenres} selectedGenres={selectedGenres} /> : <Loading/>}
        </>
    )
}