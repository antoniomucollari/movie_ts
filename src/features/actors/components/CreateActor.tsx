import type {SubmitHandler} from "react-hook-form";
import ActorForm from "./ActorForm.tsx";
import type ActorCreation from "../models/ActorCreation.ts";
import {useState} from "react";
import apiClient from "../../../api/apiClient.ts";
import {useNavigate} from "react-router";
import type {AxiosError} from "axios";
import extractErrors from "../../../utils/extractErrors.ts";

export default function CreateActor() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);
    const onSubmit : SubmitHandler<ActorCreation> = async (data) =>{
        try {
            await apiClient.postForm('/actors', data);
            navigate('/actors');
        }
        catch(err){
            const errors = extractErrors(err as AxiosError);
            setErrors(errors);
        }
    }

    return (
        <>
            <h3>Create Actor</h3>
            <ActorForm errors={errors} onSubmit={onSubmit}/>
        </>
    )
}