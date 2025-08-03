import {yupResolver} from "@hookform/resolvers/yup";
import {type SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import Button from "../../../components/Button.js";
import {NavLink} from "react-router";
import type MovieCreation from "../models/MovieCreation.model.ts";
import SelectImage from "../../../components/SelectImage/SelectImage.tsx";
import MultipleSelection from "../../../MultipleSelection/MultipleSelection.tsx";
import type MultipleSelectionDTO from "../../../MultipleSelection/MultipleSelectionDTO.model.ts";
import {useState} from "react";
import type FilterMoviesDTO from "../../genres/models/Genre.model.ts";
import type Theater from "../../theters/models/Theater.model.ts";
import TypeAheadActors from "./TypeAheadActors.tsx";
import type MovieActor from "../models/MovieActor.model.ts";
export default function MovieForm(props: MovieFormProps) {
    const [nonSelectedGenres, setNonSelectedGenres] = useState(toMultipleSelection(props.nonSelectedGenres));
    const [selectedGenres, setSelectedGenres] = useState(toMultipleSelection(props.selectedGenres));

    const [selectedActors, setSelectedActors] = useState(props.selectedActors);

    const [nonSelectedTheaters, setNonSelectedTheaters] = useState(toMultipleSelection(props.nonSelectedTheaters));
    const [selectedTheaters, setSelectedTheaters] = useState(toMultipleSelection(props.selectedTheaters));

    const {register, handleSubmit, setValue, formState: {errors, isValid, isSubmitting}} = useForm<MovieCreation>({
        resolver: yupResolver(validationRules),
        mode: 'onChange',
        defaultValues: props.model ?? {title: ''}
    })
    const currentImageURL: string | undefined =  props.model?.picture ? props.model.picture as string: undefined
    function toMultipleSelection(array: {id: number, name: string}[]): MultipleSelectionDTO[] {
        return array.map(value =>{
            return {key : value.id, description : value.name}
        })
    }
    const onSubmit: SubmitHandler<MovieCreation> = data =>{
        data.genreIds = selectedGenres.map(x =>x.key);
        data.theaterIds = selectedTheaters.map(x =>x.key);
        props.onSubmit(data)
        data.actors = selectedActors;
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input id="title" autoComplete="off" className="form-control" {...register("title")} />
                    {errors.title && <p className="error">{errors.title.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="releaseDate">Release date</label>
                    <input type='date' id="releaseDate" autoComplete="off" className="form-control" {...register("releaseDate")} />
                    {errors.releaseDate && <p className="error">{errors.releaseDate.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="trailer">Trailer</label>
                    <input id="trailer" autoComplete="off" className="form-control" {...register("trailer")} />
                    {errors.trailer && <p className="error">{errors.trailer.message}</p>}
                </div>
                <SelectImage imgUrl={currentImageURL} selectedImage={file=> setValue('picture', file)}/>
                <div className="form-group">
                    <label>Genres: </label>
                    <MultipleSelection selected={selectedGenres} nonSelected={nonSelectedGenres} onChange={(selected, nonSelected)=>{
                        setSelectedGenres(selected)
                        setNonSelectedGenres(nonSelected)
                    }}/>
                </div>

                <div className="form-group">
                    <label>Theaters: </label>
                    <MultipleSelection selected={selectedTheaters} nonSelected={nonSelectedTheaters} onChange={(selected, nonSelected)=>{
                        setSelectedTheaters(selected)
                        setNonSelectedTheaters(nonSelected)
                    }}/>
                </div>
                <div className="form-group">
                    <TypeAheadActors onCharacterChange={(id, character)=>{
                        const index = selectedActors.findIndex(ca => ca.id === id)
                        const actors = [...selectedActors]
                        actors[index].character = character
                        setSelectedActors(actors);
                        setValue('actors',actors)

                    }} actors={selectedActors} onAdd={actors=> {
                        setSelectedActors(actors)
                        setValue('actors', actors)
                    }} onRemove={(actor)=> {
                        const actors = selectedActors.filter(ca=>ca != actor);
                        setSelectedActors(actors);
                        setValue('actors',actors)
                    }}/>
                </div>
                <div className="mt-2">
                    <Button disabled={!isValid} type="submit">{isSubmitting ? 'Sending...' : 'Send'}</Button>
                    <NavLink className="btn btn-secondary ms-2" to={`/`}>Cancel</NavLink>
                </div>


            </form>
        </>
    )
}
const validationRules = yup.object({
    title: yup.string().required("Name is required"),
    releaseDate: yup.string().required("Date is Required"),
    trailer: yup.string(),
    picture: yup.mixed()
})
interface MovieFormProps{
    onSubmit: SubmitHandler<MovieCreation>;
    model?: MovieCreation;
    nonSelectedGenres: FilterMoviesDTO[];
    selectedGenres: FilterMoviesDTO[];
    nonSelectedTheaters: Theater[];
    selectedTheaters: Theater[];
    selectedActors: MovieActor[];
}