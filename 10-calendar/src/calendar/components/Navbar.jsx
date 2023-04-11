import { useAuthStore } from '../../hooks'

export const Navbar = () => {
    const { user, startLogout } = useAuthStore()

    return (
        <nav className='navbar bg-dark' data-bs-theme='dark'>
            <div className='container-fluid'>
                <a className='navbar-brand text-white'>
                    <i className='fas fa-calendar-alt me-2'></i>
                    {user.name}
                </a>
                <button className='btn btn-outline-danger' onClick={startLogout}>
                    <i className='fas fa-sign-out'></i>
                </button>
            </div>
        </nav>
    )
}