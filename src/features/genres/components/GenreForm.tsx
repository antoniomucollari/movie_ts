import {yupResolver} from "@hookform/resolvers/yup";
import type CreateGenre from '../models/CreateGenre.model';
import {type SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import Button from "../../../components/Button.js";
import firstLetterUpperCase from "../../../validation.js";
import {NavLink} from "react-router";
export default function GenreForm(props: GenreFormProps) {
    const {register, handleSubmit, formState: {errors, isValid, isSubmitting}} = useForm<CreateGenre>({
        resolver: yupResolver(validationRules),
        mode: 'onChange',
        defaultValues: props.model ?? {name: ''}
    })

    return (
        <>
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name"></label>
                    <input autoComplete="off" className="form-control" {...register("name")} />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                </div>
                <div className="mt-2">
                    <Button disabled={!isValid} type="submit">{isSubmitting ? 'Sending...' : 'Send'}</Button>
                    <NavLink className="btn btn-secondary ms-2" to={`/genres`}>Cancel</NavLink>
                </div>
            </form>
        </>
    )
}
const validationRules = yup.object({
    name: yup.string().required("Name is required").test(firstLetterUpperCase()),
})
interface GenreFormProps{
    onSubmit: SubmitHandler<CreateGenre>;
    model?: CreateGenre;
}