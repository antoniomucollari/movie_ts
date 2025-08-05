import {NavLink} from "react-router";
import {useEffect, useState} from "react";
import type Genre from "../models/Genre.model.ts";
import apiClient from "../../../api/apiClient.ts";
import GenericList from "../../../components/GenericList.tsx";
import Button from "../../../components/Button.tsx";
import Pagination from "../../../components/Pagination.tsx";

export default function IndexGenres(){
    const [genres, setGenres] = useState<Genre[]>();
    const [recordsPerPage, setRecordsPerPage] = useState(3);
    const [page, setPage] = useState(1);
    useEffect(() => {
        apiClient.get('/genre', {params: {page,recordsPerPage}}).then(res => setGenres(res.data));
    },[page, recordsPerPage]);
    return (
        <>
            <h3>genres</h3>
            <div className="mb-2">
                <NavLink className="btn btn-primary" to='/genres/create'>Create Genre</NavLink>
            </div>
            <div className="mb-2">
                <Pagination onPaginateChange={(page, recordsPerPage) =>{
                    setRecordsPerPage(recordsPerPage);
                    setPage(page);
                }} recordsPerPageOptions={[3,5,20,50 ]}/>
            </div>
            <GenericList list={genres}>
                <table className="table table-hover align-middle shadow-sm border rounded overflow-hidden">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Name</th>
                            <th className="text-end" scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {genres?.map(genre => <tr key={genre.id}>
                            <td>{genre.name}</td>
                            <td className="text-end">
                                <Button className="btn btn-sm btn-outline-primary me-2 "><i className="bi bi-pencil me-1"></i> Edit</Button>
                                <Button className="btn btn-sm btn-outline-danger me-2"><i className="bi bi-trash me-1"></i>Delete</Button>
                            </td>
                        </tr>)}

                    </tbody>
                </table>
            </GenericList>
        </>
    )
}