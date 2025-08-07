import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import type ActorCreation from "../models/ActorCreation.ts";
import ActorForm from "./ActorForm.tsx";
import Loading from "../../../components/Loading.tsx";
import type {SubmitHandler} from "react-hook-form";
import apiClient from "../../../api/apiClient.ts";
import type Actor from "../models/Actor.model.ts";
import formatDate from "../../../utils/formatDate.ts";
import extractErrors from "../../../utils/extractErrors.ts";
import type {AxiosError} from "axios";

export default function EditActor() {

    const [model, setModel] = useState<ActorCreation | undefined>(undefined);
    const {id} = useParams();
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
             apiClient.get<Actor>(`/actors/${id}`).then((response=> {
                 const actor = response.data;
                 const actorCreation: ActorCreation ={
                     name: actor.name,
                     dateOfBirth: formatDate(actor.dateOfBirth),
                     picture: actor.picture,
                 };
                 setModel(actorCreation);
             }))
    }, [id]);
    const onSubmit : SubmitHandler<ActorCreation> = async (data) =>{
        try{
            await apiClient.putForm(`/actors/${id}`, data);
            navigate("/actors");
        }
        catch(err){
            const errors = extractErrors(err as AxiosError);
            setErrors(errors);
        }
    }
    return (
        <>
            <h3>Edit Actor:  {id}</h3>
            {model? <ActorForm errors={errors} onSubmit={onSubmit} model={model} /> : <Loading/>}
        </>
    )
}