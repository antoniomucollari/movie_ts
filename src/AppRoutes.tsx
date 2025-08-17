import {Route, Routes} from "react-router";
import LandingPage from "./features/home/component/LandingPage.tsx";
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
import ProtectRoute from "./features/security/component/ProtectRoute.tsx";
import Register from "./features/security/component/Register.tsx";
import Login from "./features/security/component/Login.tsx";
import IndexUsers from "./features/security/component/IndexUsers.tsx";

export default function AppRoutes(){
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route element={<ProtectRoute claims={['isadmin']}/>}>
                    <Route path="/genres" element={<IndexGenres/>}/>
                    <Route path="/genres/create" element={<CreateGenre/>}/>
                    <Route path="/genres/edit/:id" element={<EditGenre/>}/>
                    <Route path="/movies/create" element={<CreateMovie/>}/>
                    <Route path="/movies/edit/:id" element={<EditMovies/>}/>
                    <Route path="/actors" element={<IndexActors/>}/>
                    <Route path="/actors/create" element={<CreateActor/>}/>
                    <Route path="/actors/edit/:id" element={<EditActor/>}/>
                    <Route path="/theaters" element={<IndexTheaters/>}/>
                    <Route path="/theaters/create" element={<CreateTheater/>}/>
                    <Route path="/theaters/edit/:id" element={<EditTheater/>}/>
                    <Route path='/users' element={<IndexUsers/>}/>
                </Route>


                <Route path="/movies/filter" element={<FilterMovies/>}/>
                <Route path="/movie/:id" element={<MovieDetail/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>



                <Route path='*' element={<HandleRouteNotFound/>}/>
            </Routes>
        </>
    )
}