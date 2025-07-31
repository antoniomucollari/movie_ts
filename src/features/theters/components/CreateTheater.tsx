import type {SubmitHandler} from "react-hook-form";
import type TheaterCreation from "../models/TheaterCreation.ts";
import TheaterForm from "./TheaterForm.tsx";

export default function CreateTheater() {

    const onSubmit: SubmitHandler<TheaterCreation> = async (data) =>{
        await new Promise(resolve =>setTimeout(resolve,1000));
        console.log(data)
    }
    return (
        <>
            <h3>Create theater</h3>
            <TheaterForm onSubmit={onSubmit}></TheaterForm>

        </>
    )
}