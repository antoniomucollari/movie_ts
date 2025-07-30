import type FilterMoviesDTO from "../models/FilterMoviesDTO.model.ts";
import {type SubmitHandler, useForm} from "react-hook-form";
import type Genre from '../../genres/models/Genre.model.ts'
import Button from "../../../components/Button.tsx";
export default function FilterMovies(){
    const initialValues: FilterMoviesDTO = {
        title: '',
        genreId: 0,
        inTheaters: false,
        upComingReleases: false
    }

    const {register, reset, handleSubmit, formState:{isSubmitting}} = useForm<FilterMoviesDTO>({
        defaultValues: initialValues
    });
    const onSubmit: SubmitHandler<FilterMoviesDTO> = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(data);
    }
    const genres: Genre[] = [{id:1, name:'Action'},{id:2, name:'Drama'}]
    return (
        <>
            <h3>Filter Movies</h3>
            <form className="row row-cols-lg-auto g-3 align-items-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <input placeholder="Movie title" autoComplete="off" className="form-control" {...register('title')}/>
                </div>
                <div className="col-12"></div>
                <select className="form-select" {...register('genreId')}>
                    <option value="0">--Select a genre</option>
                    {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                </select>
                <div className="col-12">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" {...register('upComingReleases')}/>
                        <label className="form-check-label" htmlFor="upcomingReleases">Upcoming Releases</label>
                    </div>
                </div>

                <div className="col-12">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" {...register('inTheaters')}/>
                        <label className="form-check-label" htmlFor="inTheaters">In Theaters</label>
                    </div>
                </div>

                <div className="col-12">
                    <Button disabled={isSubmitting} type="submit">{isSubmitting ? 'Filtering...' : 'Filter'}</Button>
                    <Button className='btn btn-danger ms-2' onClick={()=>reset()}>Reset</Button>
                </div>
            </form>
        </>
    );
}