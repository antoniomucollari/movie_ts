import {useParams} from "react-router";
import {useEffect, useState} from "react";
import type {SubmitHandler} from "react-hook-form";
import Loading from "../../../components/Loading.tsx";
import TheaterForm from "./TheaterForm.tsx";
import type TheaterCreation from "../models/TheaterCreation.ts";

export default function EditTheater() {
    const [model, setModel] = useState<TheaterCreation | undefined>(undefined);
    const {id} = useParams()
    useEffect(() => {
        const timerId = setTimeout(()=>{
            setModel({name:'Sabil' + id, latitude: 0, longitude: 0})
        },800);
        return () => {clearTimeout(timerId);}
    }, [id]);
    const onSubmit : SubmitHandler<TheaterCreation> = async (data) =>{
        await new Promise(resolve => setTimeout(resolve, 700));
        console.log(data)
    }
    return (
        <>
            <h3>Edit Theater:  {id}</h3>
            {model? <TheaterForm onSubmit={onSubmit} model={model} /> : <Loading/>}
        </>
    )
}