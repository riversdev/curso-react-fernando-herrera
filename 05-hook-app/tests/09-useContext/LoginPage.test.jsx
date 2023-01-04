import { fireEvent, render, screen } from '@testing-library/react'
import { UserContext } from '../../src/09-useContext/context/UserContext'
import { LoginPage } from '../../src/09-useContext/LoginPage'

describe('tests LoginPage', () => {
    test('should display the component without user', () => {
        render(
            <UserContext.Provider value={{ user: null }}>
                <LoginPage />
            </UserContext.Provider>
        )

        const preTag = screen.getByLabelText('preTag')
        expect(preTag.innerHTML).toBe('null')

        // screen.debug()
    })

    test('should call setUser func with the params when the button is clicked', () => {
        const setUserMock = jest.fn()

        render(
            <UserContext.Provider value={{ user: null, setUser: setUserMock }}>
                <LoginPage />
            </UserContext.Provider>
        )

        const setBtn = screen.getByTestId('setBtn')

        fireEvent.click(setBtn)

        expect(setUserMock).toHaveBeenCalled()
        expect(setUserMock).toHaveBeenCalledWith({ id: new Date().getTime(), name: 'Rivers', email: 'rivers@mail.com' })

        // screen.debug()
    })
})