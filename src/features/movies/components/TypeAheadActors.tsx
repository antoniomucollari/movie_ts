// import Typeahead from "react-bootstrap-typeahead/types/core/Typeahead";
import type MovieActor from "../models/MovieActor.model.ts";
import type {Option} from "react-bootstrap-typeahead/types/types";
import { Typeahead } from 'react-bootstrap-typeahead';
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
        </>
    )
}
interface TypeAheadActorsProps {
    actors: MovieActor[];
    onAdd(actors: MovieActor[]): void;
    onRemove(actor: MovieActor): void;
    onCharacterChange(id:number, character:string): void;
}