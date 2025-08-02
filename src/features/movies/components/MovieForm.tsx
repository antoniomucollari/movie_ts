import {yupResolver} from "@hookform/resolvers/yup";
import {type SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import Button from "../../../components/Button.js";
import {NavLink} from "react-router";
import type MovieCreation from "../models/MovieCreation.model.ts";
import SelectImage from "../../../components/SelectImage/SelectImage.tsx";
export default function MovieForm(props: MovieFormProps) {
    const {register, handleSubmit, setValue, formState: {errors, isValid, isSubmitting}} = useForm<MovieCreation>({
        resolver: yupResolver(validationRules),
        mode: 'onChange',
        defaultValues: props.model ?? {title: ''}
    })
    const currentImageURL: string | undefined =  props.model?.picture ? props.model.picture as string: undefined

    return (
        <>
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input id="title" autoComplete="off" className="form-control" {...register("title")} />
                    {errors.title && <p className="error">{errors.title.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="releaseDate">Release date</label>
                    <input type='date' id="releaseDate" autoComplete="off" className="form-control" {...register("releaseDate")} />
                    {errors.releaseDate && <p className="error">{errors.releaseDate.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="trailer">Trailer</label>
                    <input id="trailer" autoComplete="off" className="form-control" {...register("trailer")} />
                    {errors.trailer && <p className="error">{errors.trailer.message}</p>}
                </div>
                <SelectImage imgUrl={currentImageURL} selectedImage={file=> setValue('picture', file)}/>
                <div className="mt-2">
                    <Button disabled={!isValid} type="submit">{isSubmitting ? 'Sending...' : 'Send'}</Button>
                    <NavLink className="btn btn-secondary ms-2" to={`/`}>Cancel</NavLink>
                </div>


            </form>
        </>
    )
}
const validationRules = yup.object({
    title: yup.string().required("Name is required"),
    releaseDate: yup.string().required("Date is Required"),
    trailer: yup.string(),
    picture: yup.mixed()
})
interface MovieFormProps{
    onSubmit: SubmitHandler<MovieCreation>;
    model?: MovieCreation;
}