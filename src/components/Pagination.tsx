export default function Pagination(props: PaginationProps){
    const pages = [];
    const maxAmoutOfPagesToDisplay = 5;
    const amountOfPages = Math.ceil(props.totalAmountOfRecords / props.recordsPerPage);
    const radius = Math.floor(maxAmoutOfPagesToDisplay / 2);
    return (
        <>
            <div className="text-center" >
                <div className="row align-items-start justify-content-center">
                    <div className="col-auto">
                        <div className="d-flex align-items-center gap-2">
                            <label className="mb-0">Records per page:</label>
                            <select onChange={e=>props.onPaginateChange(1, parseInt(e.target.value, 10))} className="form-select form-select-sm w-auto" id="">
                                {props.recordsPerPageOptions.map(option=><option key={option}>{option}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                    <div className="col-auto">
                    <ul className="pagination justify-content-center mb-0">
                        <li className="page-item">
                            <button className="page-link">
                                Previous
                            </button>
                        </li>
                        <li className="page-item">
                            <button className="page-link">
                                Next
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

interface PaginationProps{
    totalAmountOfRecords:number;
    recordsPerPage:number;
    recordsPerPageOptions: number[];
    onPaginateChange: (page: number, recordsPerPage: number) => void;
}