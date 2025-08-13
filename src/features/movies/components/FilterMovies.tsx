import type FilterMoviesDTO from "../models/FilterMoviesDTO.model.ts";
import {type SubmitHandler, useForm} from "react-hook-form";
import type Genre from '../../genres/models/Genre.model.ts'
import Button from "../../../components/Button.tsx";
import {useEffect, useState} from "react";
import apiClient from "../../../api/apiClient.ts";
import type Movie from "../models/movie.model.ts";
import MoviesList from "./MoviesList.tsx";
import {useSearchParams} from "react-router";
import Pagination from "../../../components/Pagination.tsx";
import Loading from "../../../components/Loading.tsx";
export default function FilterMovies(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [recordsPerPage, setRecordsPerPage] = useState(searchParams.has('recordsPerPage')? parseInt(searchParams.get('recordsPerPage')!,10):5);
    const [genres,setGenres] = useState<Genre[]>([]);
    const [movies,setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(searchParams.has('page')? parseInt(searchParams.get('page')!,10):1);
    const [loading, setLoading] = useState(false);
    const [totalAmountOfRecords, setTotalAmountOfRecords] = useState<number>(0);
    useEffect(()=> {
        apiClient.get<Genre[]>(`/genres/all`).then(res => setGenres(res.data))
    },[])
    useEffect(() => {
        if(genres.length ===0){
            return;
        }
        if(searchParams.has('title')){
            initialValues.title = searchParams.get('title')!
            setValue('title', initialValues.title);
        }
        if(searchParams.has('genreId')){
            initialValues.genreId = parseInt(searchParams.get('genreId')!,10)
            setValue('genreId', initialValues.genreId);
        }

        if(searchParams.has('upComingReleases')){
            initialValues.upComingReleases = Boolean(searchParams.get('upComingReleases')!)
            setValue('upComingReleases', initialValues.upComingReleases);
        }

        if(searchParams.has('inTheaters')){
            initialValues.inTheaters = Boolean(searchParams.get('inTheaters')!)
            setValue('inTheaters', initialValues.inTheaters);
        }
        setLoading(true)
        loadRecords(initialValues)

    }, [genres,page,recordsPerPage]);

    async function loadRecords(values: FilterMoviesDTO){
        modifyUrl(values)
        const res = await apiClient.get('movies/filter',{params: {...values,page,recordsPerPage}})
        setLoading(false);
        setMovies(res.data)
        const totalAmountOfRecords = parseInt(res.data.headers['total-records-count'],10)
        setTotalAmountOfRecords(totalAmountOfRecords)
    }
    const initialValues: FilterMoviesDTO = {
        title: '',
        genreId: 0,
        inTheaters: false,
        upComingReleases: false
    }
    const handleChildButtonClick = ()=> {
        // setLoading(false)
    };


    const {register, reset,setValue, handleSubmit, formState:{isSubmitting}} = useForm<FilterMoviesDTO>({
        defaultValues: initialValues
    });
    const onSubmit: SubmitHandler<FilterMoviesDTO> = async (data) => {
        await loadRecords(data) ;
    }
    function modifyUrl(values:FilterMoviesDTO){
        const params = new URLSearchParams();
        if(values.title){
            params.set("title", values.title);
        }

        if(values.genreId){
            params.set("genreId", String(values.genreId));
        }

        if(values.inTheaters){
            params.set('inTheaters', String(values.inTheaters))
        }

        if(values.upComingReleases){
            params.set('upComingReleases', String(values.upComingReleases))
        }
        params.set('page', String(page));
        params.set('recordsPerPage', String(recordsPerPage));
        setSearchParams(params);

    }

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
                    <Button className='btn btn-danger ms-2' onClick={()=> {
                        reset()
                        loadRecords(initialValues)
                    }}>Reset</Button>
                </div>
            </form>
            {loading ? <Loading /> : <>
                <div className="mt-4">
                    <MoviesList movies={movies}></MoviesList>
                </div>
                <div className="mb-2">
                    <Pagination onButtonClick={handleChildButtonClick} totalAmountOfRecords={totalAmountOfRecords} recordsPerPage={recordsPerPage} currentPage={page}
                                onPaginateChange={
                                    (page, recordsPerPage) =>{setRecordsPerPage(recordsPerPage);setPage(page)}}
                                recordsPerPageOptions={[5,10,20,50]
                                }/>
                </div>
                </>
            }
        </>
    );
}