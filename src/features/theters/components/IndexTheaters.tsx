import {useEntities} from "../../../hooks/useEntities.ts";
import IndexEntities from "../../../components/IndexEntities.tsx";
import type Theater from "../models/Theater.model.ts";

export default function IndexTheaters() {
    const theatersHook = useEntities<Theater>('/theaters');
    return (
        <>
            <IndexEntities<Theater> entity={"Theater"} title={"Theaters"} {...theatersHook}>
                {(entities, buildButtons)=>
                    <>
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">Name</th>
                            <th className="text-end" scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {entities?.map(theater => <tr key={theater.id}>
                            <td>{theater.name}</td>
                            <td className="text-end">
                                {buildButtons(`/theaters/edit/${theater.id}`, theater.id)}
                            </td>
                        </tr>)}

                        </tbody>
                    </>}
            </IndexEntities>
        </>
    )
}