import {useEntities} from "../../../hooks/useEntities.ts";
import type User from "../models/User.model.ts";
import IndexEntities from "../../../components/IndexEntities.tsx";
import Button from "../../../components/Button.tsx";
import type {EditClaim} from "../models/EditClaim.model.ts";
import apiClient from "../../../api/apiClient.ts";
import Swal from "sweetalert2";

export default function IndexUsers() {
    async function makeAdmin(email:string){
        await editAdmin('/users/makeadmin', email);
    }

    async function removeAdmin(email:string){
        await editAdmin('/users/removeadmin', email);
    }

    async function editAdmin(url:string,email:string){
        const editClaimDTO:EditClaim = {email:email};
        await apiClient.post(url, editClaimDTO);
        Swal.fire({title:'Success', icon: 'success', text: 'Successfully done!'});
    }
    const usersHook = useEntities<User>('users/indexusers')
    return (
        <>
            <IndexEntities<User> entity={"Users"} title="Users" {...usersHook}>
                {
                    (users) =>
                        <>
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">Email</th>
                                    <th scope="col" className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {users?.map(user=> <tr key={user.email}>
                                <td>{user.email}</td>
                                <td className="text-end">
                                    <Button onClick={()=> makeAdmin(user.email)}>Make admin</Button>
                                    <Button onClick={()=> removeAdmin(user.email)} className="btn btn-danger ms-1">Remove admin</Button>
                                </td>
                            </tr>)}
                            </tbody>
                        </>
                }
            </IndexEntities>
            <h3></h3>
        </>
    )
}