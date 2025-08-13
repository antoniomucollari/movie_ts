import type Genre from "../../genres/models/Genre.model.ts";
import type Movie from "./movie.model.ts";
import type Theater from "../../theters/models/Theater.model.ts";
import type MovieActor from "./MovieActor.model.ts";

export default interface MoviesPutGet {
    movie: Movie;
    selectedGenres: Genre[];
    nonSelectedGenres: Genre[];
    nonSelectedTheaters: Theater[];
    selectedTheaters: Theater[];
    actors: MovieActor[];
}