import { fireEvent, render, screen } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { LoginPage } from '../../../src/auth/pages'
import { authSlice } from '../../../src/store/auth'
// import { startGoogleSignIn, startLoginWithEmailAndPassword } from '../../../src/store/auth/thunks'
import { notAuthenticatedState } from '../../fixtures/authFixtures'

const mockStartGoogleSignIn = jest.fn()
const mockStartLoginWithEmailAndPassword = jest.fn()

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailAndPassword: ({ email, password }) => () => mockStartLoginWithEmailAndPassword({ email, password })
}))

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn() // mock del useDispatch
}))

// si se crea el configureStore en el test se pueden usar solo los reducers necesario y el preloadedState
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})

describe('tests LoginPage', () => {
    beforeEach(() => jest.clearAllMocks())

    test('should display the component', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)

        // screen.debug()
    })

    test('should call startGoogleSignIn with click in the google button', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const googleBtn = screen.getByTestId('googleBtn')

        fireEvent.click(googleBtn)

        expect(mockStartGoogleSignIn).toHaveBeenCalled()

        // screen.debug()
    })

    test('should call startLoginWithEmailAndPassword on submit', () => {
        const email = 'mail@mail.com'
        const password = '123123'

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const emailField = screen.getByRole('textbox', { name: 'Correo' }) // material ui le pone ese name. Es extrano pero funciona asi xd
        const passwordField = screen.getByTestId('passwordField')
        const loginForm = screen.getByTestId('loginForm')

        fireEvent.change(emailField, { target: { type: 'email', name: 'email', value: email } })
        fireEvent.change(passwordField, { target: { type: 'password', name: 'password', value: password } })
        fireEvent.submit(loginForm)

        expect(mockStartLoginWithEmailAndPassword).toHaveBeenCalledWith({ email, password })

        // screen.debug()
    })
})