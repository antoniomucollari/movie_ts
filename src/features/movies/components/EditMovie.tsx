import {useParams} from "react-router";


export default function EditMovies() {
    const {id} = useParams()
    return (
        <>
            <h3>Edit Movie {id}</h3>
        </>
    );
}