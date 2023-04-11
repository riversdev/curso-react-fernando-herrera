import { useEffect, useMemo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/pages'
import { CalendarPage } from '../calendar/pages'
import { useAuthStore } from '../hooks'

export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore()
    const isAuthenticated = useMemo(() => status === 'authenticated', [status])

    useEffect(() => {
        checkAuthToken()
    }, [])

    if (status === 'checking') return (<h3>Revisando autenticacion...</h3>)

    return (
        <Routes>
            {
                isAuthenticated
                    ? (<Route path='/' element={<CalendarPage />} />)
                    : (<Route path='/' element={<LoginPage />} />)
            }

            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}