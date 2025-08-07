export default function formatDate(dateISO:string){
    return new Date(dateISO).toISOString().split("T")[0];
}