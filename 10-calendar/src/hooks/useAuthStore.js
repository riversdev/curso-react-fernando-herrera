import { useDispatch, useSelector } from 'react-redux'
import { calendarApi } from '../api'
import { checking, login, logout } from '../store/auth/authSlice'
import { clearAllCalendar } from '../store/calendar/calendarSlice'

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async ({ email, password }) => {
        dispatch(checking())

        try {
            const { data: { ok, token, ...user } } = await calendarApi.post('/auth', { email, password })

            localStorage.setItem('token', token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login(user))
        } catch (error) {
            console.log(error)
            dispatch(logout({ errorMessage: 'Credenciales incorrectas' }))
        }
    }

    const startRegister = async ({ name, email, password }) => {
        dispatch(checking())

        try {
            const { data: { ok, token, ...user } } = await calendarApi.post('/auth/new', { name, email, password })

            localStorage.setItem('token', token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login(user))
        } catch (error) {
            console.log(error)
            dispatch(logout({ errorMessage: error.response.data?.msg || 'Imposible crear usuario' }))
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token')

        if (!token) return dispatch(logout())

        try {
            const { data: { ok, token, ...user } } = await calendarApi.get('/auth/renew')

            localStorage.setItem('token', token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login(user))
        } catch (error) {
            console.log(error)
            localStorage.removeItem('token')
            dispatch(logout())
        }
    }

    const startLogout = () => {
        localStorage.clear()

        dispatch(clearAllCalendar())
        dispatch(logout())
    }

    return {
        status,
        user,
        errorMessage,

        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}