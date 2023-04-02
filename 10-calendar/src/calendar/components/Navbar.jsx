export const Navbar = () => {
    return (
        <nav className='navbar bg-dark' data-bs-theme='dark'>
            <div className='container-fluid'>
                <a className='navbar-brand text-white'>
                    <i className='fas fa-calendar-alt me-2'></i>
                    Alejandro
                </a>
                <button className='btn btn-outline-danger'>
                    <i className='fas fa-sign-out'></i>
                </button>
            </div>
        </nav>
    )
}