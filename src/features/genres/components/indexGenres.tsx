import {useEntities} from "../../../hooks/useEntities.ts";
import type Genre from "../models/Genre.model.ts";
import IndexEntities from "../../../components/IndexEntities.tsx";

export default function IndexGenres(){
    const genresHook = useEntities<Genre>('/genres');
    return (
        <>
            <IndexEntities<Genre> entity={"Genre"} title={"Genres"} {...genresHook}>
                {(entities, buildButtons)=>
                    <>
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">Name</th>
                            <th className="text-end" scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {entities?.map(genre => <tr key={genre.id}>
                            <td>{genre.name}</td>
                            <td className="text-end">
                                {buildButtons(`/genres/edit/${genre.id}`, genre.id)}
                            </td>
                        </tr>)}

                        </tbody>
                    </>}
            </IndexEntities>
        </>
    )
}