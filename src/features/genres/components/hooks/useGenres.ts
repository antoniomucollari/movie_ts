import {useCallback, useEffect, useState} from "react";
import type Genre from "../../models/Genre.model.ts";
import apiClient from "../../../../api/apiClient.ts";

export function useGenres() {
    const [genres, setGenres] = useState<Genre[]>();
    const [recordsPerPage, setRecordsPerPage] = useState(3);
    const [page, setPage] = useState(1);
    const [totalAmountOfRecords, setTotalAmountOfRecords] = useState(0);
    const [loading, setLoading] = useState(true);
    const handleChildButtonClick = ()=> setLoading(true);
    const loadRecords = useCallback(()=>{
        apiClient.get('/genre', {params: {page,recordsPerPage}})
            .then(res => {
                const totalAmountOfRecords = parseInt(res.headers['total-records-count'],10)
                setTotalAmountOfRecords(totalAmountOfRecords);
                setGenres(res.data);
                setLoading(false);
        });
    },[page, recordsPerPage]);
    useEffect(() => {
        setLoading(true);
        loadRecords();
    }, [loadRecords]);

    return {handleChildButtonClick, loading, page,recordsPerPage, totalAmountOfRecords,setPage,setRecordsPerPage,genres, loadRecords};
}