import AuthForm from "./AuthForm.tsx";

export default function Login() {
    return (
        <>
            <h3>Login</h3>
            <AuthForm url="/users/login"/>
        </>
    )
}