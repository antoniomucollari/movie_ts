import type MovieCreation from "../models/MovieCreation.model.ts";

export default  function  convertMovieToFormData(movieCreation: MovieCreation):FormData{
    const formData = new FormData();
    formData.append("title", movieCreation.title)
    formData.append("releaseDate", movieCreation.releaseDate)
    if(movieCreation.trailer){
        formData.append("trailer", movieCreation.trailer);
    }

    if(movieCreation.poster){
        formData.append("poster", movieCreation.poster);
    }

    formData.append("theatersIds", JSON.stringify(movieCreation.theaterIds ?? []));
    formData.append("genresIds", JSON.stringify(movieCreation.genreIds?? []));
    formData.append("actors", JSON.stringify(movieCreation.actors ?? []));
    return formData;
}