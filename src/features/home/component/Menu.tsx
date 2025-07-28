export default function Menu(){
    return (
        <nav className="nav navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a href="navbar-brand">React Movies</a>
                <div className="collape navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a href="" className="nav-link">Genres</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}