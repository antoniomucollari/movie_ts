import type ActorCreation from "../models/ActorCreation.ts";
import {type SubmitHandler, useForm} from "react-hook-form";
import Button from "../../../components/Button.tsx";
import {NavLink} from "react-router";

export default function ActorForm(props: ActorFormProps){
    const {register,handleSubmit,formState:{errors,isValid,isSubmitting}} = useForm<ActorCreation>({
        defaultValues: props.model?? {name: ''}
    })
    return (
        <>
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" autoComplete="off" className='form-control' {...register('name')}/>
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                    <input autoComplete="off" className='form-control' type='date' {...register('dateOfBirth')}/>
                </div>
                <div className="mt-2">
                    <Button type='submit' disabled={!isValid || isSubmitting}>{isSubmitting ? 'Sending...' : 'Send'} </Button>
                    <NavLink to='/actors' className="btn btn-secondary ms-2">Cancel</NavLink>
                </div>
            </form>
        </>
    )
}

interface ActorFormProps{
    onSubmit: SubmitHandler<ActorCreation>;
    model?: ActorCreation;
}