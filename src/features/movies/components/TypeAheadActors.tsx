// import Typeahead from "react-bootstrap-typeahead/types/core/Typeahead";
import type MovieActor from "../models/MovieActor.model.ts";
import type {Option} from "react-bootstrap-typeahead/types/types";
import { Typeahead } from 'react-bootstrap-typeahead';
import {useState} from "react";
export default function TypeAheadActors(props: TypeAheadActorsProps) {
    const actors: MovieActor[] = [
        {
            id: 1,
            name: 'Al Pacino',
            character: 'Tony Montana',
            picture: 'https://upload.wikimedia.org/wikipedia/en/1/19/Tony_Montana_in_Scarface_%281983%29%2C_portrayed_by_Al_Pacino.jpg'
        },
        {
            id: 2,
            name: 'Robert De Niro',
            character: 'Travis Bickle',
            picture: 'https://upload.wikimedia.org/wikipedia/en/a/af/Travis_Bickle.jpeg'
        },
        {
            id: 3,
            name: 'Heath Ledger',
            character: 'Joker',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Heath_Ledger_%282%29.jpg/500px-Heath_Ledger_%282%29.jpg'
        },
        {
            id: 4,
            name: 'Leonardo DiCaprio',
            character: 'Jordan Belfort',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Leonardo_Dicaprio_Cannes_2019.jpg/500px-Leonardo_Dicaprio_Cannes_2019.jpg'
        }
    ];
    const selection: MovieActor[] = [];

    const [draggedElement, setDraggedElement] = useState<MovieActor | undefined>(undefined);

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
            <Typeahead options={actors} filterBy={['name']}
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