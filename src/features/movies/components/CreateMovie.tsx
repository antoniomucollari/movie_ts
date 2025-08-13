import type {SubmitHandler} from "react-hook-form";
import MovieForm from "./MovieForm.tsx";
import type MovieCreation from "../models/MovieCreation.model.ts";
import type Genre from "../../genres/models/Genre.model.ts";
import type Theater from "../../theters/models/Theater.model.ts";
import {useEffect, useState} from "react";
import apiClient from "../../../api/apiClient.ts";
import type MoviesPostGet from "../models/MoviesPostGet.model.ts";
import Loading from "../../../components/Loading.tsx";
import convertMovieToFormData from "../utils/convertMovieToFormData.ts";
import type Movie from "../models/movie.model.ts";
import {useNavigate} from "react-router";
import extractErrors from "../../../utils/extractErrors.ts";
import type {AxiosError} from "axios";


export default function CreateMovie() {
    const navigate = useNavigate();
    const [nonSelectedGenre, setNonSelectedGenre] = useState<Genre[]>([]);
    const [nonSelectedTheaters, setNonSelectedTheaters] = useState<Theater[]>([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<string[]>([]);
    useEffect(()=>{
        apiClient.get<MoviesPostGet>('/movies/postget').then(res => {
            setNonSelectedGenre(res.data.genres);
            setNonSelectedTheaters(res.data.theaters);
            setLoading(false);
        })
    },[])

    const onSubmit : SubmitHandler<MovieCreation> = async (data) =>{
        try {
            const formData = convertMovieToFormData(data);
            const response = await apiClient.postForm<Movie>('/movies', formData);
            const movie = response.data;
            navigate(`/movie/${movie.id}`);
        }
        catch (err){
            const errors = extractErrors(err as AxiosError);
            setErrors(errors);

        }
    }
    return (
        <>
            <h3>Create Movie</h3>
            {loading ? <Loading /> :
                    <MovieForm errors={errors} selectedActors={[]} nonSelectedTheaters={nonSelectedTheaters} selectedTheaters={[]} selectedGenres={[]} nonSelectedGenres={nonSelectedGenre} onSubmit={onSubmit}/>
            }
        </>
    )
}