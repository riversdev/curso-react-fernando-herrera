import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../src/auth'
import { AppRouter } from '../../src/router/AppRouter'

describe('tests AppRouter', () => {
    test('should display the login if isnt authenticated', () => {
        const context = {
            logged: false,
            user: null,
        }

        render(
            <MemoryRouter initialEntries={['/dc']}>
                <AuthContext.Provider value={context}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect(screen.getAllByText('Login').length).toBe(2)

        // screen.debug()
    })

    test('should display the marvel page if is authenticated', () => {
        const context = {
            logged: true,
            user: { id: 123, name: 'Rivers' },
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={context}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect(screen.getByText('Marvel Comics')).toBeTruthy()

        // screen.debug()
    })
})