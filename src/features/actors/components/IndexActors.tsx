import IndexEntities from "../../../components/IndexEntities.tsx";
import type Actor from "../models/Actor.model.ts";
import {useEntities} from "../../../hooks/useEntities.ts";

export default function IndexActors() {
    const actorsHook = useEntities<Actor>('/actors');
    return (
        <>
            <IndexEntities<Actor> entity={"Actor"} title={"Actors"} {...actorsHook}>
              {(entities, buildButtons)=>
                  <>
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">Name</th>
                        <th className="text-end" scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {entities?.map(actor => <tr key={actor.id}>
                        <td>{actor.name}</td>
                        <td className="text-end">
                            {buildButtons(`/actors/edit/${actor.id}`, actor.id)}
                        </td>
                    </tr>)}

                    </tbody>
                  </>}
            </IndexEntities>
        </>
    )
}