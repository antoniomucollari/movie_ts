export default function Pagination(props: PaginationProps){
    const pages = [];
    const maxAmoutOfPagesToDisplay = 5;
    const amountOfPages = Math.ceil(props.totalAmountOfRecords / props.recordsPerPage);
    const radius = Math.floor(maxAmoutOfPagesToDisplay / 2);
    for(let i = 1; i<= amountOfPages; i++){
        if (i > props.currentPage -radius && i<=props.currentPage + radius){
            pages.push(i);
        }
    }
    return (
        <>
            <div className="text-center">
                <div className="row align-items-start justify-content-center">
                    <div className="col-auto">
                        <div className="d-flex align-items-center gap-2">
                            {/*<label className="mb-0">Records per page:</label>*/}
                            <select
                                onChange={e => props.onPaginateChange(1, parseInt(e.target.value, 10))}
                                className="form-select form-select-sm w-auto"
                                id=""
                            >
                                {props.recordsPerPageOptions.map(option => (
                                    <option key={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-auto">
                        <ul className="pagination justify-content-center mb-0">
                            <li className={`page-item ${props.currentPage === 1 ? 'disabled' : ''}`}>
                                <button
                                    onClick={() => {
                                        props.onButtonClick();
                                        props.onPaginateChange(props.currentPage - 1, props.recordsPerPage);
                                    }}
                                    className="page-link"
                                >
                                    Previous
                                </button>
                            </li>
                            {pages.map(page => (
                                <li key={page} className={`page-item ${props.currentPage === page ? 'disabled' : ''}`}>
                                    <button
                                        onClick={() => {
                                            props.onButtonClick();
                                            props.onPaginateChange(page, props.recordsPerPage)
                                        }}
                                        style={{
                                            backgroundColor: props.currentPage === page ? '#0d6efd' : '',
                                            color: props.currentPage === page ? 'white' : ''
                                        }}
                                        className={`page-link`}>
                                        {page}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${props.currentPage === amountOfPages ? 'disabled' : ''}`}>
                                <button
                                    onClick={() => {
                                        props.onButtonClick();
                                        props.onPaginateChange(props.currentPage + 1, props.recordsPerPage)
                                    }}
                                    className="page-link">
                                    Next
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

interface PaginationProps{
    onButtonClick: () => void;
    currentPage: number;
    totalAmountOfRecords:number;
    recordsPerPage:number;
    recordsPerPageOptions: number[];
    onPaginateChange: (page: number, recordsPerPage: number) => void;
}