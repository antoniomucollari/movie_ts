import type Movie from "../../movies/models/movie.model.ts";

export default interface LoadingPageDTO {
    inTheaters?: Movie[];
    upComing?: Movie[];
}