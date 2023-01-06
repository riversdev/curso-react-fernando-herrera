import { Link, NavLink, useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/login', {
            replace: true
        })
    }

    return (
        <nav className='navbar navbar-expand-sm navbar-dark bg-dark px-4 py-2'>
            <Link
                className='navbar-brand'
                to='/'
            >
                Asociaciones
            </Link>
            <div className='navbar-collapse'>
                <div className='navbar-nav'>

                    <NavLink
                        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                        to='/marvel'
                    >
                        Marvel
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                        to='/dc'
                    >
                        DC
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                        to='/search'
                    >
                        Search
                    </NavLink>
                </div>
            </div>
            <div className='navbar-collapse collapse w-100 order-3 dual-collapse2'>
                <ul className='navbar-nav ms-auto'>
                    <span className='nav-item nav-link text-secondary'>Alejandro</span>
                    <button
                        className='btn btn-outline-light'
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}