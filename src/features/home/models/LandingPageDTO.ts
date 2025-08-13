import type Movie from "../../movies/models/movie.model.ts";

export default interface LandingPageDTO {
    inTheaters?: Movie[];
    upcomingReleases?: Movie[];
}