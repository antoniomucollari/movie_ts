import {type SubmitHandler, useForm} from "react-hook-form";
import Button from "../../../components/Button.tsx";
import {NavLink} from "react-router";
import * as yup from "yup";
import firstLetterUpperCase from "../../validations/firstLetterUpperCase.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import type TheaterCreation from "../models/TheaterCreation.ts";
export default function TheaterForm(props: TheaterFormProps){
    const {register,handleSubmit,formState:{errors,isValid,isSubmitting}} = useForm<ActorCreation>({
        resolver: yupResolver(validationRules),
        defaultValues: props.model?? {name: ''},
        mode: "onChange"

    })
    // const currentImageURL: string | undefined = props.model?.picture ? props.model.picture as string: undefined
    return (
        <>
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" autoComplete="off" className='form-control' {...register('name')}/>
                    {errors.name && <p className="error">{errors.name.message}</p>}
                </div>
                <div className="mt-2">
                    <Button type='submit' disabled={!isValid || isSubmitting}>{isSubmitting ? 'Sending...' : 'Send'} </Button>
                    <NavLink to='/theaters' className="btn btn-secondary ms-2">Cancel</NavLink>
                </div>
            </form>
        </>
    )
}

interface TheaterFormProps{
    onSubmit: SubmitHandler<TheaterCreation>;
    model?: TheaterCreation;
}

const validationRules = yup.object({
    name: yup.string().required("Required").test(firstLetterUpperCase()),
})
