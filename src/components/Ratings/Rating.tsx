import {useEffect, useState} from "react";
import styles from "./Rating.module.css"
export default function Rating(props: RatingProps){
    const [maxRatingArray, setMaxRatingArray] = useState<number[]>([]);
    const[tempSelectedValue, setTempSelectedValue] = useState<number>(props.selectedVote);
    const [vote, setVote]= useState<number>(props.selectedVote);

    useEffect(() => {
        setMaxRatingArray(Array(props.maxRating).fill(0));
    },[props.maxRating])
    function onMouseEnter(vote:number){
        setTempSelectedValue(vote)
    }
    function onMouseLeave(){
            setTempSelectedValue(vote)
    }
    function onClick(vote: number){
        setTempSelectedValue(vote)
        setVote(vote)
        props.onVote(vote)
    }
    return (
        <>
            {maxRatingArray.map((_, index) => (
                <i onMouseLeave={()=>onMouseLeave()} onClick={()=> onClick(index+1)} onMouseEnter={()=>onMouseEnter(index+1)}
                   className={`bi bi-star-fill ms-1 ${index < tempSelectedValue ? styles.checked: null}`} key={index}>

                </i>))}
        </>
    )
}

interface RatingProps {
    maxRating:number;
    onVote(vote:number): void;
    selectedVote:number;
}