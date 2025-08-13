import type Genre from "../../genres/models/Genre.model.ts";
import type Theater from "../../theters/models/Theater.model.ts";

export default interface MoviesPostGet{
    genres: Genre[];
    theaters: Theater[];
}