import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../src/auth'
import { Navbar } from '../../../src/ui/components/Navbar'

const mockUseNavigate = jest.fn() // IMPORTANTE... el nombre siempre debe comenzar con "mock" = mockNombreDeLaConstante

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}))

describe('tests Navbar', () => {
    const context = {
        logged: true,
        user: { id: 123, name: 'Rivers' },
        logout: jest.fn(),
    }

    beforeEach(() => jest.clearAllMocks())

    test('should display the name of the logged user', () => {
        render(
            <AuthContext.Provider value={context}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText(context.user.name)).toBeTruthy()

        // screen.debug()
    })

    test('should call the logout and navigate function when the button is clicked', () => {
        render(
            <AuthContext.Provider value={context}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        const logoutBtn = screen.getByRole('button')

        expect(context.logout).not.toHaveBeenCalled()
        expect(mockUseNavigate).not.toHaveBeenCalled()

        fireEvent.click(logoutBtn)

        expect(context.logout).toHaveBeenCalled()
        expect(mockUseNavigate).toHaveBeenCalledWith('/login', { replace: true })

        // screen.debug()
    })
})