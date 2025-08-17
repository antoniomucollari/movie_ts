import {useEntities} from "../../../hooks/useEntities.ts";
import type User from "../models/User.model.ts";
import IndexEntities from "../../../components/IndexEntities.tsx";
import Button from "../../../components/Button.tsx";
import type {EditClaim} from "../models/EditClaim.model.ts";
import apiClient from "../../../api/apiClient.ts";
import Swal from "sweetalert2";
import {getClaims, logout} from "../utils/HandleJWT.ts";
import {useContext} from "react";
import AuthenticationContext from "../utils/AuthenticationContext.ts";

export default function IndexUsers() {
    const {claims, update} = useContext(AuthenticationContext)
    const currentUserEmail = claims.find(c => c.name === "email")?.value;

    async function editAdmin(url: string, email: string) {
        const isSelf = email === currentUserEmail;
        const isMakeAdmin = url.includes("makeadmin");

        // If self and trying to make admin → just show info
        if (isSelf && isMakeAdmin) {
            await Swal.fire({
                title: "Info",
                text: "You are already an admin.",
                icon: "info"
            });
            return;
        }

        // If self and trying to remove admin → confirm
        if (isSelf && !isMakeAdmin) {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Removing your own admin role will log you out.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, remove",
                cancelButtonText: "Cancel"
            });

            if (!result.isConfirmed) return;
        }

        // Perform backend call
        const editClaimDTO: EditClaim = { email };
        await apiClient.post(url, editClaimDTO);

        // Success message
        await Swal.fire({
            title: "Success",
            text: "Successfully done!",
            icon: "success"
        });

        // If self + removing admin → logout + redirect
        if (isSelf && !isMakeAdmin) {
            logout();
            update([]);
            window.location.href = "/login";
        }
    }

    async function makeAdmin(email: string) {
        await editAdmin("/users/makeadmin", email);
    }

    async function removeAdmin(email: string) {
        await editAdmin("/users/removeadmin", email);
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