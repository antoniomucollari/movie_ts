import type Actor from "../../actors/models/Actor.model.ts";
import type Theater from "../../theters/models/Theater.model.ts";
import type Genre from "../../genres/models/Genre.model.ts";

export default interface  Movie{
    id: number;
    title: string;
    poster: string;
    releaseDate: string;
    trailer: string;
    genres?: Genre[];
    theaters?: Theater[];
    actors?: Actor[];
    averageRate: number;
    userVote: number;
}