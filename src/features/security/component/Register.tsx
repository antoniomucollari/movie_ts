import AuthForm from "./AuthForm.tsx";

export default function Register() {
    return (
        <>
            <h3>Register</h3>
            <AuthForm url="/users/register"/>
        </>
    )
}