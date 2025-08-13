import MoviesList from "../../movies/components/MoviesList.tsx";
import {useEffect, useState} from "react";
import type LandingPageDTO from "../models/LandingPageDTO.ts";
import apiClient from "../../../api/apiClient.ts";
import Loading from "../../../components/Loading.tsx";
import AlertContext from "../../../utils/AlertContext.ts";

export default function LandingPage() {
    const [movies,setMovies] = useState<LandingPageDTO>({})
    useEffect(()=>{
        loadMovies()
    },[])
    function loadMovies(){
        apiClient.get<LandingPageDTO>('/movies/landing').then(res => setMovies(res.data))
    }
    return (
        <>
            {!(movies.inTheaters || movies.upcomingReleases)? <Loading />:
                <>
                    <AlertContext.Provider value={loadMovies}>
                        <h3>In Theaters:</h3>
                        <MoviesList movies={movies.inTheaters}/>
                        <h3>Upcoming movies:</h3>
                        <MoviesList movies={movies.upcomingReleases} />
                    </AlertContext.Provider>
                </>
            }
        </>
    )
}