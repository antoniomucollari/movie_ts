import {type SubmitHandler, useForm} from "react-hook-form";
import Button from "../../../components/Button.tsx";
import {NavLink} from "react-router";
import * as yup from "yup";
import firstLetterUpperCase from "../../validations/firstLetterUpperCase.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import type TheaterCreation from "../models/TheaterCreation.ts";
import Map from "../../../components/Map/Map.tsx";
import type Coordinate from "../../../components/Map/coordinate.model.ts";
import DisplayErrors from "../../../components/DisplayErrors.tsx";
export default function TheaterForm(props: TheaterFormProps){
    const {setValue, register,handleSubmit,formState:{errors,isValid,isSubmitting}} = useForm<TheaterCreation>({
        resolver: yupResolver(validationRules),
        defaultValues: props.model?? {name: ''},
        mode: "onChange"

    })

    function transformCoordinate(): Coordinate[] | undefined{
        if(props.model){
             const response: Coordinate = {
                 lng: props.model.latitude,
                 lat: props.model.longitude,

             }
             return [response];

        }
        return undefined;
    }
    // const currentImageURL: string | undefined = props.model?.picture ? props.model.picture as string: undefined
    return (
        <>
            <DisplayErrors errors={props.errors} />
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" autoComplete="off" className='form-control' {...register('name')}/>
                    {errors.name && <p className="error">{errors.name.message}</p>}
                </div>

                <div className="mt-4">
                    <Map coordinates={transformCoordinate()} CoordinateProp={coor => {
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
    errors: string[];
}

const validationRules = yup.object({
    name: yup.string().required("Required").test(firstLetterUpperCase()),
    latitude: yup.number().required("Required"),
    longitude: yup.number().required("Required")
})
