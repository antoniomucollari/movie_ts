import {type SubmitHandler, useForm} from "react-hook-form";
import Button from "../../../components/Button.tsx";
import {NavLink} from "react-router";
import * as yup from "yup";
import firstLetterUpperCase from "../../validations/firstLetterUpperCase.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import type TheaterCreation from "../models/TheaterCreation.ts";
import Map from "../../../components/Map/Map.tsx";
export default function TheaterForm(props: TheaterFormProps){
    const {setValue, register,handleSubmit,formState:{errors,isValid,isSubmitting}} = useForm<TheaterCreation>({
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

                <div className="mt-4">
                    <Map CoordinateProp={coor => {
                        setValue('latitude', coor.lat, { shouldValidate: true });
                        setValue('longitude', coor.lng, { shouldValidate: true });
                    }} />
                </div>
                <div className="mt-2">
                    <Button disabled={!isValid} type='submit' >{isSubmitting ? 'Sending...' : 'Send'} </Button>
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
    latitude: yup.number().required("Required"),
        longitude: yup.number().required("Required")
})
