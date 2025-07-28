import type Movie from "../models/movie.model.ts";
import styles from './DisplayMovie.module.css'
export default function DisplayMovies(props: DisplayMoviesProps) {
    const buildLink = ()=> '/movie/${props.movieId}'
    return (
        <div className={styles.div}>
            <a>
                <img src={props.movie.poster} alt="Poster image" />
            </a>
            <p><a href={buildLink()}>{props.movie.title}</a></p>
        </div>
    )
}

interface DisplayMoviesProps {
    movie: Movie;
}