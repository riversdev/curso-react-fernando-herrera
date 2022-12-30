import { useEffect } from 'react'
import { useForm } from '../hooks/useForm'

export const FormWithCustomHook = () => {
    const { formState, handleInputChange, resetForm } = useForm({
        username: '',
        email: '',
        password: '',
    })

    const { username, email, password } = formState

    return (
        <>
            <h1>Form con custom Hook</h1>
            <hr />
            <input
                type='text'
                name='username'
                className='form-control'
                placeholder='Username'
                value={username}
                onChange={handleInputChange}
            />
            <input
                type='email'
                name='email'
                className='form-control'
                placeholder='mail@example.com'
                value={email}
                onChange={handleInputChange}
            />
            <input
                type='password'
                name='password'
                className='form-control'
                placeholder='Contrasena'
                value={password}
                onChange={handleInputChange}
            />
            <button className='btn btn-primary' onClick={resetForm}>Borrar</button>
        </>
    )
}