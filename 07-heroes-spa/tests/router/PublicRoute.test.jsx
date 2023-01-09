import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../../src/auth/context/AuthContext'
import { PublicRoute } from '../../src/router/PublicRoute'

describe('tests PublicRoute', () => {
    test('should display children if it isnt authenticated', () => {
        const context = {
            logged: false,
            user: null,
        }

        render(
            <AuthContext.Provider value={context} >
                <PublicRoute>
                    <h1>Ruta publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Ruta publica')).toBeTruthy()

        // screen.debug()
    })

    test('should navigate if it is authenticated', () => {
        const context = {
            logged: true,
            user: { id: 123, name: 'Rivers' },
        }

        render(
            <AuthContext.Provider value={context} >
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Ruta publica</h1>
                            </PublicRoute>
                        } />
                        <Route path='/' element={<h1>This is a Marvel page</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText('This is a Marvel page')).toBeTruthy()

        // screen.debug()
    })
})