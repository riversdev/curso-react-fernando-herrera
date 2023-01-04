import { useContext } from 'react'
import { UserContext } from './context/UserContext'

export const LoginPage = () => {
    const { user, setUser } = useContext(UserContext)

    return (
        <>
            <h1>Login Page</h1>
            <hr />
            <pre aria-label='preTag'>{JSON.stringify(user, null, 3)}</pre>
            <button
                className='btn btn-primary'
                data-testid='setBtn'
                onClick={() => setUser({ id: new Date().getTime(), name: 'Rivers', email: 'rivers@mail.com' })}
            >
                Set user
            </button>
        </>
    )
}