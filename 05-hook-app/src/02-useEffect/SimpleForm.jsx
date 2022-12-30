import { useEffect, useState } from 'react'
import { Message } from './Message'

export const SimpleForm = () => {
    const [formState, setFormState] = useState({
        username: 'rivers',
        email: 'rivers@mail.com'
    })

    const { username, email } = formState

    const handleInputChange = ({ target: { name, value } }) => setFormState({ ...formState, [name]: value })

    useEffect(() => {
        console.log('useeffect called')

        return () => {
            console.log('useEffect return')
        }
    }, [])

    return (
        <>
            <h1>Simple Form</h1>
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
            {username === 'rivers2' && <Message />}
        </>
    )
}