import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import type {SubmitHandler} from "react-hook-form";
import Loading from "../../../components/Loading.tsx";
import type MovieCreation from "../models/MovieCreation.model.ts";
import MovieForm from "./MovieForm.tsx";
import apiClient from "../../../api/apiClient.ts";
import type MoviesPutGet from "../models/MoviesPutGet.model.ts";
import convertMovieToFormData from "../utils/convertMovieToFormData.ts";
import extractErrors from "../../../utils/extractErrors.ts";
import type {AxiosError} from "axios";
import formatDate from "../../../utils/formatDate.ts";


export default function EditMovies() {
    const navigate = useNavigate();
    const [model, setModel] = useState<MovieCreation>();
    const [moviesPutGet, setMoviesPutGet] = useState<MoviesPutGet>();
    const [errors,setErrors] = useState<string[]>([])
    const {id} = useParams()
    useEffect(() => {
        apiClient.get<MoviesPutGet>(`/movies/putget/${id}`).then(res => {
            const movie = res.data.movie;
            const movieCreation: MovieCreation={
                title: movie.title,
                releaseDate: formatDate(movie.releaseDate),
                trailer: movie.trailer,
                poster: movie.poster,
            }
            setModel(movieCreation);
            setMoviesPutGet(res.data)
            console.log(res.data.selectedTheaters)
        })
    }, [id]);

    const onSubmit : SubmitHandler<MovieCreation> = async (data) =>{
        try{
            const formData = convertMovieToFormData(data);
            await apiClient.putForm(`/movies/${id}`,formData)
            navigate(`/movie/${id}`)

        }
        catch(error){
            const errors = extractErrors(error as AxiosError)
            setErrors(errors)
        }
    }
    return (
        <>
            <h3>Edit Movie with id:  {id}</h3>
            {model && moviesPutGet? <MovieForm selectedTheaters={moviesPutGet.selectedTheaters}
                                               nonSelectedTheaters={moviesPutGet.nonSelectedTheaters}
                                               onSubmit={onSubmit} model={model}
                                               nonSelectedGenres={moviesPutGet.nonSelectedGenres}
                                               selectedGenres={moviesPutGet.selectedGenres || undefined} selectedActors={moviesPutGet.actors}
                                               errors={errors} /> : <Loading/>}
        </>
    )
}