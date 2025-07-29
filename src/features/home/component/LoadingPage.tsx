import MoviesList from "../../movies/components/MoviesList.tsx";
import {useEffect, useState} from "react";
import type Movie from "../../movies/models/movie.model.ts";
import type LoadingPageDTO from "../models/LoadingPageDTO.ts";

export default function LoadingPage() {
    const [movies,setMovies] = useState<LoadingPageDTO>({})
    useEffect(()=>{
        const inTheaters: Movie[] = [{
            id: 1,
            title: 'Sinners',
            poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Sinners_%282025_film%29_poster.jpg/250px-Sinners_%282025_film%29_poster.jpg'
        },
            {
                id: 2,
                title: 'No Time To Die',
                poster: 'https://upload.wikimedia.org/wikipedia/en/f/fe/No_Time_to_Die_poster.jpg'
            }
        ]

        const upComing: Movie[] = [{
            id: 3,
            title: 'The Life List',
            poster: 'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Life_List_poster.jpg'
        }]
        setTimeout(()=>{
            setMovies({inTheaters, upComing})
        }, 500)
    },[])
    return (
        <>
            <h3>In Theaters:</h3>
            <MoviesList movies={movies.inTheaters} />
            <h3>Upcoming movies:</h3>
            <MoviesList movies={movies.upComing} />
        </>
    )
}