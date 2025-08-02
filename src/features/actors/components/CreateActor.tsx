import type {SubmitHandler} from "react-hook-form";
import ActorForm from "./ActorForm.tsx";
import type ActorCreation from "../models/ActorCreation.ts";

export default function CreateActor() {
    const onSubmit : SubmitHandler<ActorCreation> = async (data) =>{
        await new Promise(resolve => setTimeout(resolve, 700));
        console.log(data)
    }

    return (
        <>
            <h3>Create Actor</h3>
            <ActorForm onSubmit={onSubmit}/>
        </>
    )
}