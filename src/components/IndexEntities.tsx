import apiClient from "../api/apiClient.ts";
import Loading from "./Loading.tsx";
import {NavLink} from "react-router";
import Pagination from "./Pagination.tsx";
import GenericList from "./GenericList.tsx";
import Button from "./Button.tsx";
import customConfirm from "../utils/customConfirm.ts";
import type {ReactNode} from "react";

export default function IndexEntities<T>({handleChildButtonClick, children, entities, recordsPerPage, totalAmountOfRecords, entity,title,page,loadRecords,setPage, loading,setRecordsPerPage}:INdexEntitiesProps<T>){

    async function deleteEntity(genreId:number){
        await apiClient.delete(`/${title}/${genreId}`);
        if(page ===1){
            loadRecords();
        }
        else{
            setPage(1);
        }
    }
    const buildButtons = (editUrl: string, id:number)=>
        <>
            <NavLink to={editUrl} className="btn btn-sm btn-outline-primary me-2 "><i className="bi bi-pencil me-1"></i> Edit</NavLink>
            <Button onClick={()=> {
                customConfirm(()=> {
                    handleChildButtonClick()
                    deleteEntity(id)})
            }} className="btn btn-sm btn-outline-danger me-2"><i className="bi bi-trash me-1"></i>Delete</Button>
        </>
    return(
        <>
            <h3>{title}</h3>
            <div className="mb-2">
                <NavLink className="btn btn-primary" to={`/${title}/create`}>Create {entity}</NavLink>
            </div>

            {loading ? <Loading /> : <>
                <GenericList list={entities}>
                    <table className="table table-hover align-middle shadow-sm border rounded overflow-hidden">
                        {children(entities!,buildButtons)}
                    </table>
                </GenericList>
                <div className="mb-2">
                    <Pagination onButtonClick={handleChildButtonClick} totalAmountOfRecords={totalAmountOfRecords} recordsPerPage={recordsPerPage} currentPage={page}
                    onPaginateChange={
                        (page, recordsPerPage) =>{setRecordsPerPage(recordsPerPage);setPage(page)}}
                        recordsPerPageOptions={[5,10,20,50 ]
                    }/>
                </div>
            </>}
        </>

    )
}

interface INdexEntitiesProps<T>{
    entities?: T[];
    loading: boolean;
    entity:string;
    title:string;
    page:number;
    loadRecords: ()=>void;
    setPage: (page:number) => void;
    setRecordsPerPage: (recordsPerPage:number) => void;
    totalAmountOfRecords:number;
    recordsPerPage:number;
    children: (entities: T[], buildButtons:(editUrl:string,id:number) => ReactNode) => ReactNode;
    handleChildButtonClick: ()=>void;
}