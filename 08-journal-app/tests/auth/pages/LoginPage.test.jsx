import { render, screen } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { LoginPage } from '../../../src/auth/pages'
import { authSlice } from '../../../src/store/auth'

// si se crea el configureStore en el test se pueden usar solo los reducers necesario y el preloadedState
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
    // preloadedState:{

    // }
})

describe('tests LoginPage', () => {
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
})