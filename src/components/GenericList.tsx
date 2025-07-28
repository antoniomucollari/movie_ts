import type {ReactNode} from "react";
import Loading from "./Loading.tsx";

export default function GenericList<T>(props: GenericListProps<T>) {
    if (!props.list){
        return props.loadingUI ? props.loadingUI: <Loading/>;
    }
    else if(props.list.length === 0){
        return props.emptyListUI ? props.emptyListUI : 'there are no elements found.';

    }
    return props.children;
}

interface GenericListProps <T>{
    list: T[] | undefined;
    children: ReactNode;
    loadingUI?: ReactNode;
    emptyListUI?: ReactNode;
}