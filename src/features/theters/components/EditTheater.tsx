import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import type {SubmitHandler} from "react-hook-form";
import Loading from "../../../components/Loading.tsx";
import TheaterForm from "./TheaterForm.tsx";
import type TheaterCreation from "../models/TheaterCreation.ts";
import apiClient from "../../../api/apiClient.ts";
import extractErrors from "../../../utils/extractErrors.ts";
import type {AxiosError} from "axios";
import type Theater from "../models/Theater.model.ts";

export default function EditTheater() {
    const [model, setModel] = useState<TheaterCreation | undefined>(undefined);
    const {id} = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState<string[]>([]);

    useEffect(() => {
        apiClient.get<Theater>(`/theaters/${id}`).then(res => setModel(res.data));
    }, [id]);
    const onSubmit : SubmitHandler<TheaterCreation> = async (data) =>{
        try{
            console.log(data)
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
            <h3>Edit Theater:  {id}</h3>
            {model? <TheaterForm errors={error} onSubmit={onSubmit} model={model} /> : <Loading/>}
        </>
    )
}