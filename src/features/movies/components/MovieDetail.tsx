import {useParams} from "react-router";
import {useEffect, useState} from "react";
import apiClient from "../../../api/apiClient.ts";
import type Movie from "../models/movie.model.ts";
import Loading from "../../../components/Loading.tsx";
import type Coordinate from "../../../components/Map/coordinate.model.ts";
import Map from "../../../components/Map/Map.tsx";
import Rating from "../../../components/Ratings/Rating.tsx";
import Swal from "sweetalert2";
import {userIsLoggedIn} from "../../security/utils/HandleJWT.ts";


export default function MovieDetail() {
    const {id} = useParams();
    const [movie,setMovie] = useState<Movie>();
    const [refreshKey, setRefreshKey] = useState(0);
    useEffect(() => {
        apiClient.get<Movie>(`/movies/${id}`).then(res => {
            setMovie(res.data);
            })
    }, [id, refreshKey]);
    if(!movie){
        return <Loading/>
    }

    const date = new Date(movie.releaseDate);
    const year = date.getFullYear();
    function getYoutubeEmbedUrl(url?: string): string | undefined {
        try {
            const objUrl = new URL(url ?? "");
            const videoId = objUrl.searchParams.get("v");
            return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
        } catch {
            return undefined;
        }
    }

    function transformCoordinates():Coordinate[]{
        return movie!.theaters!.map(t=>{
            const coordinate: Coordinate = {lat: t.latitude, lng: t.longitude, message: t.name};
            return coordinate;
        })
    }
    async function handleVote(vote:number){
        const isUserLoggedIn = userIsLoggedIn();
        if(!isUserLoggedIn){
            Swal.fire({icon:"error",title:"You have to login to vote!"});
            return;
        }
        try{
            const data = {movieId: Number(id), rate: vote}
            await apiClient.post(`/ratings`, data)
            Swal.fire({icon: 'success', title: 'Successfully voted',})
            setRefreshKey(prev => prev + 1)
        }
        catch(err){
            console.log(err)
        }
    }
    const embedUrl = getYoutubeEmbedUrl(movie.trailer);
    return (
        <>
            <div className="contaner my-4">
                <h2>{movie.title}<small className="ms-2 text-muted smaller-text">({year})</small></h2>

                {movie.genres && movie.genres.length > 0 && (
                    <div className="mb-2">
                        {movie.genres.map(genre => <span key={genre.id} className="badge bg-primary me-2">
                            {genre.name}
                        </span>)}
                    </div>
                )}
                <p className="text-muted">Release date: {date.toLocaleDateString()}| Average rate: {movie.averageVote === 0 ? '-' : movie.averageVote} | My rating: <Rating selectedVote={movie.userVote} onVote={handleVote} maxRating={5}/> </p>
                <div className="d-flex">
                    <span className="d-inline-block me-4">
                        <img src={movie.poster} style={{width: '225px', height:'315px'}} alt=""/>
                    </span>
                    {embedUrl && (
                        <div>
                            <iframe
                                width="565"
                                height="315"
                                src={embedUrl}
                                title="trailer"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
                {movie.actors && movie.actors.length > 0 && (
                    <div className="mb-2">
                        <h4>Actors</h4>
                        <div className="row">
                            {movie.actors.map((actor) => (
                                <div key={actor.id} className="col-md-4 d-flex mb-3">
                                    <img src={actor.picture} alt={actor.name} className="rounded me-3" style={{width:'80px', height:'80px'}}/>
                                    <div>
                                        <strong>{actor.name}</strong>
                                        <br/>
                                        <span className="text-muted">{actor.character}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {movie.theaters && movie.theaters.length > 0 && (
                    <div style={{width: '100%'}} className="mb-2">
                        <h2>Showing the following theaters:</h2>
                        <Map notAllowClicks={true} coordinates={transformCoordinates()}></Map>
                    </div>
                )}
            </div>
        </>
    )
}