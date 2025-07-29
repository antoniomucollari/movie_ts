import Button from "../../../components/Button.tsx";
import {useNavigate} from "react-router";

export default function CreateGenre() {
    const navigate = useNavigate();
    function handleClick(){
        navigate('/genres')
    }
    return (
        <>
            <h3>Create Genre</h3>
            <Button onClick={handleClick}>Send</Button>
        </>
    )
}