import { authSlice, checkingCredentials, login, logout } from '../../../src/store/auth/authSlice'
import { authenticatedState, initialState, userTest } from '../../fixtures/authFixtures'

describe('tests authSlice', () => {
    test('should return the initial state', () => {
        const state = authSlice.reducer(initialState, {})

        expect(state).toEqual(initialState)
        expect(authSlice.name).toBe('auth')
    })

    test('should do the authentication', () => {
        const action = login(userTest)

        const state = authSlice.reducer(initialState, action)

        expect(state).toEqual({
            status: 'authenticated',
            errorMessage: null,
            ...userTest
        })
    })

    test('should do the logout without error message', () => {
        const action = logout()

        const state = authSlice.reducer(authenticatedState, action)

        expect(state.status).toBe('not-authenticated')
    })

    test('should do the logout with error message', () => {
        const errorMessage = 'Neeeeel'
        const action = logout({ errorMessage })

        const state = authSlice.reducer(authenticatedState, action)

        expect(state.status).toBe('not-authenticated')
        expect(state.errorMessage).toBe(errorMessage)
    })

    test('should change the state a checking', () => {
        const action = checkingCredentials()

        const state = authSlice.reducer(authenticatedState, action)

        expect(state.status).toBe('checking')
    })
})