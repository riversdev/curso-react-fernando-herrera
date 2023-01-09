import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../src/auth'
import { PrivateRoute } from '../../src/router/PrivateRoute'

describe('tests PrivateRoute', () => {
    test('should display children if it is authenticated', () => {
        Storage.prototype.setItem = jest.fn() // asi se prueba el localStorage // se crea un jest function en el prototype del Storage

        const context = {
            logged: true,
            user: { id: 123, name: 'Rivers' },
        }

        render(
            <AuthContext.Provider value={context} >
                <MemoryRouter initialEntries={['/search?q=green']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Ruta privada')).toBeTruthy()
        expect(localStorage.setItem).toHaveBeenCalled()
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=green')

        // screen.debug()
    })
})