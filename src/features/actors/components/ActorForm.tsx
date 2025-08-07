import type ActorCreation from "../models/ActorCreation.ts";
import {type SubmitHandler, useForm} from "react-hook-form";
import Button from "../../../components/Button.tsx";
import {NavLink} from "react-router";
import * as yup from "yup";
import firstLetterUpperCase from "../../validations/firstLetterUpperCase.ts";
import dateMustNotBeInTheFuture from "../../validations/dateMustNotBeInTheFuture.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import SelectImage from "../../../components/SelectImage/SelectImage.tsx";
import DisplayErrors from "../../../components/DisplayErrors.tsx";
export default function ActorForm(props: ActorFormProps){
    const {register,handleSubmit, setValue,formState:{errors,isValid,isSubmitting}} = useForm<ActorCreation>({
        resolver: yupResolver(validationRules),
        defaultValues: props.model?? {name: ''},
        mode: "onChange"

    })
    const currentImageURL: string | undefined = props.model?.picture ? props.model.picture as string: undefined
    return (
        <>
            <DisplayErrors errors={props.errors}/>
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" autoComplete="off" className='form-control' {...register('name')}/>
                    {errors.name && <p className="error">{errors.name.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                    <input autoComplete="off" className='form-control' type='date' {...register('dateOfBirth')}/>
                    {errors.dateOfBirth && <p className="error">{errors.dateOfBirth.message}</p>}
                </div>
                    <SelectImage imgUrl={currentImageURL} selectedImage={file=> setValue('picture', file)}/>
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
    errors: string[];
}

const validationRules = yup.object({
    name: yup.string().required("Required").test(firstLetterUpperCase()),
    dateOfBirth: yup.string().required("Required").test(dateMustNotBeInTheFuture())
})
