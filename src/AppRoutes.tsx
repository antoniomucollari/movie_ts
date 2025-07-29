import {Route, Routes} from "react-router";
import LoadingPage from "./features/home/component/LoadingPage.tsx";
import IndexGenres from "./features/genres/components/indexGenres.tsx";
import CreateGenre from "./features/genres/components/CreateGenre.tsx";
import EditGenre from "./features/genres/components/EditGenre.tsx";
import FilterMovies from "./features/movies/components/FilterMovies.tsx";
import MovieDetail from "./features/movies/components/MovieDetail.tsx";
import CreateMovie from "./features/movies/components/CreateMovie.tsx";
import EditMovies from "./features/movies/components/EditMovie.tsx";
import CreateActor from "./features/actors/components/CreateActor.tsx";
import IndexActors from "./features/actors/components/IndexActors.tsx";
import EditActor from "./features/actors/components/EditActor.tsx";
import IndexTheaters from "./features/theters/components/IndexTheaters.tsx";
import CreateTheater from "./features/theters/components/CreateTheater.tsx";
import EditTheater from "./features/theters/components/EditTheater.tsx";
import HandleRouteNotFound from "./features/home/component/HandleRouteNotFound.tsx";

export default function AppRoutes(){
    return (
        <>
            <Routes>
                <Route path="/" element={<LoadingPage/>}/>
                <Route path="/genres" element={<IndexGenres/>}/>
                <Route path="/genres/create" element={<CreateGenre/>}/>
                <Route path="/genres/edit/:id" element={<EditGenre/>}/>

                <Route path="/movies/filter" element={<FilterMovies/>}/>
                <Route path="/movies" element={<MovieDetail/>}/>
                <Route path="/movies/create" element={<CreateMovie/>}/>
                <Route path="/movies/edit/:id" element={<EditMovies/>}/>

                <Route path="/actors" element={<IndexActors/>}/>
                <Route path="/actors/create" element={<CreateActor/>}/>
                <Route path="/actors/edit/:id" element={<EditActor/>}/>

                <Route path="/theaters" element={<IndexTheaters/>}/>
                <Route path="/theaters/create" element={<CreateTheater/>}/>
                <Route path="/theaters/edit/:id" element={<EditTheater/>}/>

                <Route path='*' element={<HandleRouteNotFound/>}/>
            </Routes>
        </>
    )
}