import {useParams} from "react-router";
import {useEffect, useState} from "react";
import type ActorCreation from "../models/ActorCreation.ts";
import ActorForm from "./ActorForm.tsx";
import Loading from "../../../components/Loading.tsx";
import type {SubmitHandler} from "react-hook-form";

export default function EditActor() {

    const [model, setModel] = useState<ActorCreation | undefined>(undefined);
    const {id} = useParams()
    useEffect(() => {
         const timerId = setTimeout(()=>{
             setModel({name:'Filipe', dateOfBirth:'2022-11-23', picture: 'https://beauty-around.com/images/sampledata/Hollywood_Actors/22chaiseKrouford.jpg'})
         },800);
         return () => {clearTimeout(timerId);}
    }, [id]);
    const onSubmit : SubmitHandler<ActorCreation> = async (data) =>{
        await new Promise(resolve => setTimeout(resolve, 700));
        console.log(data)
    }
    return (
        <>
            <h3>Edit Actor:  {id}</h3>
            {model? <ActorForm onSubmit={onSubmit} model={model} /> : <Loading/>}
        </>
    )
}