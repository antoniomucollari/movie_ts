import type MovieActor from "./MovieActor.model.ts";

export default interface MovieCreation {
    title: string;
    releaseDate?: string;
    trailer?: string;
    picture?: File | string;
    genreIds?: number[];
    theaterIds?: number[];
    actors?: MovieActor[];
}