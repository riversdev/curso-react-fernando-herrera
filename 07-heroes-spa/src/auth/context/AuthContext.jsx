import { createContext, useReducer } from 'react'
import { types } from '../types/types'
import { authReducer } from './authReducer'

const initialState = {
    logged: false,
    user: null,
}

const init = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    return {
        logged: !!user,
        user,
    }
}

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, initialState, init)

    const login = (name = '') => {
        const user = { id: '123', name }
        const action = { type: types.login, payload: user }

        localStorage.setItem('user', JSON.stringify(user))

        dispatch(action)
    }

    const logout = () => {
        const action = { type: types.logout }

        localStorage.removeItem('user')

        dispatch(action)
    }

    return (
        <AuthContext.Provider value={{
            ...authState,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}