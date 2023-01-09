import { authReducer } from '../../../src/auth/context/authReducer'
import { types } from '../../../src/auth/types/types'

describe('tests authReducer', () => {
    const initialState = {
        logged: false,
        user: null,
    }

    test('should return the default state', () => {
        const state = authReducer(initialState)

        expect(state).toBe(initialState)
    })

    test('should call auth login and set user', () => {
        const user = { id: 123, name: 'Rivers' }
        const action = { type: types.login, payload: user }
        const state = authReducer(initialState, action)

        expect(state).toEqual({
            logged: true,
            user
        })
        expect(state.logged).toBeTruthy()
        expect(state.user).toBe(user)
        expect(state.user).toEqual(user)
        expect(state.user).toEqual({
            id: user.id,
            name: user.name
        })
        expect(state.user).toEqual({
            id: expect.any(Number),
            name: expect.any(String)
        })
    })

    test('should call auth logout and delete user', () => {
        const action = { type: types.logout }
        initialState.logged = true
        const state = authReducer(initialState, action)

        expect(state.logged).toBeFalsy()
        expect(state.user).toBe(null)
    })
})