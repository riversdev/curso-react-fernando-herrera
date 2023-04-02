import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/pages'
import { CalendarPage } from '../calendar/pages'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/auth/*' element={<LoginPage />} />
            <Route path='/' element={<CalendarPage />} />

            <Route path='*' element={<Navigate to='/auth' />} />
        </Routes>
    )
}