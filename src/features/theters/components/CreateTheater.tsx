import type {SubmitHandler} from "react-hook-form";
import type TheaterCreation from "../models/TheaterCreation.ts";
import TheaterForm from "./TheaterForm.tsx";
import apiClient from "../../../api/apiClient.ts";
import extractErrors from "../../../utils/extractErrors.ts";
import {useNavigate} from "react-router";
import type {AxiosError} from "axios";
import {useState} from "react";

export default function CreateTheater() {
    const navigate = useNavigate();
    const [error, setError] = useState<string[]>([]);
    const onSubmit: SubmitHandler<TheaterCreation> = async (data) =>{
        try{
            await apiClient.post('/theaters', data);
            navigate('/theaters');
        }
        catch(err){
            const errors = extractErrors(err as AxiosError)
            setError(errors)
        }
    }
    return (
        <>
            <h3>Create theater</h3>
            <TheaterForm errors={error} onSubmit={onSubmit}></TheaterForm>

        </>
    )
}