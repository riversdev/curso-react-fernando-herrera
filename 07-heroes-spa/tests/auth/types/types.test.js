import { types } from '../../../src/auth/types/types'

describe('tests types', () => {
    test('should return this types', () => {
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        })
    })
})