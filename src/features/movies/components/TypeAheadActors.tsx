// import Typeahead from "react-bootstrap-typeahead/types/core/Typeahead";
import type MovieActor from "../models/MovieActor.model.ts";
import type {Option} from "react-bootstrap-typeahead/types/types";
import {useState} from "react";
import apiClient from "../../../api/apiClient.ts";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
export default function TypeAheadActors(props: TypeAheadActorsProps) {

    const [actors, setActors] = useState<MovieActor[]>([]);
    const selection: MovieActor[] = [];

    const [draggedElement, setDraggedElement] = useState<MovieActor | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);


    function handleSearch(query: string) {
        setLoading(true);
        apiClient.get<MovieActor[]>(`/actors/search/${encodeURIComponent(query)}`).then((res) => {
            setActors(res.data)
            setLoading(false);
        });

    }

    function handleDragStart(actor: MovieActor) {
        setDraggedElement(actor)
    }
    function handleDragEnd(actor: MovieActor) {
        if(!draggedElement || actor.id === draggedElement.id) return;
        const actors = [...props.actors]
        const fromIndex = actors.findIndex((ca) => ca.id === draggedElement.id);
        const toIndex = actors.findIndex((ca) => ca.id === actor.id);
        if(fromIndex !== -1 && toIndex !== -1) {
            [actors[fromIndex], actors[toIndex]] = [actors[toIndex], actors[fromIndex]];
            props.onAdd(actors)
        }
    }

    return (
        <>
            <label >Actors</label>
            <AsyncTypeahead isLoading={loading} onSearch={handleSearch} options={actors} filterBy={['name']}
               onChange={(actors: Option[])=>{
                   const selectedActor = actors[0] as MovieActor;
                   if (props.actors.findIndex(currentActor => currentActor.id === selectedActor.id) === -1) {
                       selectedActor.character = '';
                       props.onAdd([...props.actors, selectedActor]);
                   }
               }
               }
                labelKey={
                    (option: Option) =>{
                        const actor = option as MovieActor;
                        return actor.name}}
                placeholder="Write the name of the actor."
                selected={selection}
                renderMenuItemChildren={(option: Option) =>{
                    const actor = option as MovieActor
                    return (<>
                        <img src={actor.picture} alt="actor's image" style={{height:'64px', width:'64px', marginRight:'10px'}} />
                        <span>{actor.name}</span>
                    </>)
                }}
               flip={true}
            />

            <ul className="list-group">
                {props.actors.map((actor) => <li onDragStart={()=>handleDragStart(actor)} onDragOver={()=> handleDragEnd(actor)} draggable={true} key={actor.id} className="list-group-item d-flex align-items-center">
                    <div>
                        <img style={{width:'64px'}} src={actor.picture} alt="picture"/>
                    </div>
                    <div style={{width:'150px', marginLeft:'1rem'}} >
                        {actor.name}
                    </div>
                    <div className="flex-group-1 mx-3">
                        <input value={actor.character} onChange={e=> props.onCharacterChange(actor.id, e.currentTarget.value)} type="text" className="form-control" placeholder="Character"/>
                    </div>
                    <span role="button" className="badge text-bg-secondary" onClick={()=>props.onRemove(actor)}>X</span>
                </li>)}
            </ul>
        </>
    )
}
interface TypeAheadActorsProps {
    actors: MovieActor[];
    onAdd(actors: MovieActor[]): void;
    onRemove(actor: MovieActor): void;
    onCharacterChange(id:number, character:string): void;
}