import {NavLink} from "react-router";
import {useActors} from "../hooks/useActors.ts";
import apiClient from "../../../api/apiClient.ts";
import Loading from "../../../components/Loading.tsx";
import GenericList from "../../../components/GenericList.tsx";
import Button from "../../../components/Button.tsx";
import customConfirm from "../../../utils/customConfirm.ts";
import Pagination from "../../../components/Pagination.tsx";

export default function IndexActors() {
    const {loadRecords, loading, page,recordsPerPage, totalAmountOfRecords,setPage,setRecordsPerPage,actors, handleChildButtonClick} = useActors();
    async function deleteActor(actorId:number){
        await apiClient.delete(`/actors/${actorId}`);
        if(page ===1){
            loadRecords();
        }
        else{
            setPage(1);
        }
    }
    return (
        <>
            <h3>Actors</h3>
            <div className="mb-2">
                <NavLink className="btn btn-primary" to='/actors/create'>Create Actor</NavLink>
                {loading ? <Loading /> : <>
                    <GenericList list={actors}>
                        <table className="table table-hover align-middle shadow-sm border rounded overflow-hidden">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th className="text-end" scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {actors?.map(actor => <tr key={actor.id}>
                                <td>{actor.name}</td>
                                <td className="text-end">
                                    <NavLink to={`/actors/edit/${actor.id}`} className="btn btn-sm btn-outline-primary me-2 "><i className="bi bi-pencil me-1"></i> Edit</NavLink>
                                    <Button onClick={()=> {
                                        customConfirm(()=> {
                                            handleChildButtonClick()
                                            deleteActor(actor.id)
                                        })
                                    }} className="btn btn-sm btn-outline-danger me-2"><i className="bi bi-trash me-1"></i>Delete</Button>
                                </td>
                            </tr>)}

                            </tbody>
                        </table>
                    </GenericList>
                    <div className="mb-2">
                        <Pagination onButtonClick={handleChildButtonClick} totalAmountOfRecords={totalAmountOfRecords} recordsPerPage={recordsPerPage} currentPage={page}
                                    onPaginateChange={
                                        (page, recordsPerPage) =>{setRecordsPerPage(recordsPerPage);setPage(page);
                                        }} recordsPerPageOptions={[3,5,20,50 ]}/>
                    </div>
                </>}
            </div>
        </>
    )
}