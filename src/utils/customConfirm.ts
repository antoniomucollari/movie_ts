import Swal from 'sweetalert2';
export default function customConfirm(
    onConfirm: ()=> void,
    title: string= 'Do you want to delete the record?',
    confirmButtonText: string= 'Delete'
){
    Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: confirmButtonText
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
        }
    })
}