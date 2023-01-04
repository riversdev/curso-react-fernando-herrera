import { render, screen } from '@testing-library/react'
import { UserContext } from '../../src/09-useContext/context/UserContext'
import { HomePage } from '../../src/09-useContext/HomePage'

describe('tests HomePage', () => {
    const user = {
        id: 1,
        name: 'Rivers',
        email: 'rivers@mail.com'
    }

    test('should display the component without user', () => {
        // para hacer test de un componente que utiliza un context se debe renderizar el context provider aqui
        render(
            <UserContext.Provider value={{ user: null }}>
                <HomePage />
            </UserContext.Provider>
        )

        const preTag = screen.getByLabelText('preTag')
        expect(preTag.innerHTML).toBe('null')

        // screen.debug()
    })

    test('should display the component with user', () => {
        // para hacer test de un componente que utiliza un context se debe renderizar el context provider aqui
        render(
            <UserContext.Provider value={{ user }}>
                <HomePage />
            </UserContext.Provider>
        )

        const preTag = screen.getByLabelText('preTag')

        expect(screen.getByText(user.name))
        expect(preTag.innerHTML).toContain(user.id.toString()) // a string porque es un numero :v
        expect(preTag.innerHTML).toContain(user.name)
        expect(preTag.innerHTML).toContain(user.email)

        // screen.debug()
    })
})