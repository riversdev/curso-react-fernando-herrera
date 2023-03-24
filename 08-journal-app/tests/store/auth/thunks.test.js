import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailAndPassword, signInWithGoogle } from '../../../src/firebase/providers'
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice'
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailAndPassword, startLogout, startRegisterUserWithEmailAndPassword } from '../../../src/store/auth/thunks'
import { clearNotesLogout } from '../../../src/store/journal/journalSlice'
import { userTest } from '../../fixtures/authFixtures'

jest.mock('../../../src/firebase/providers') // todos los providers dentro ya son mocks

describe('tests thunks', () => {
    const dispatch = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    test('should call checking credentials', async () => {
        await checkingAuthentication()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    })

    test('should call checking credentials and login on success case in startGoogleSignIn', async () => {
        const loginData = { ok: true, ...userTest }

        // mock
        await signInWithGoogle.mockResolvedValue(loginData) // hacer que el mock retorne el objeto que se supone debe retornar
        // thunk
        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(userTest))
    })

    test('should call checking credentials and logout on error case in startGoogleSignIn', async () => {
        const errorMessage = 'Neeel'
        const loginData = { ok: false, errorMessage }

        // mock
        await signInWithGoogle.mockResolvedValue(loginData) // hacer que el mock retorne el objeto que se supone debe retornar
        // thunk
        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage }))
    })

    test('should call checking credentials and login on success case in startRegisterUserWithEmailAndPassword', async () => {
        const loginData = { ok: true, ...userTest }
        const formData = { email: userTest.email, password: '', displayName: userTest.displayName }

        await registerUserWithEmailAndPassword.mockResolvedValue(loginData)

        await startRegisterUserWithEmailAndPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(userTest))
    })

    test('should call checking credentials and logout on error case in startRegisterUserWithEmailAndPassword', async () => {
        const errorMessage = 'Neeeel'
        const loginData = { ok: false, errorMessage }
        const formData = { email: userTest.email, password: '', displayName: userTest.displayName }

        await registerUserWithEmailAndPassword.mockResolvedValue(loginData)

        await startRegisterUserWithEmailAndPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage }))
    })

    test('should call checking credentials and login on success case in startLoginWithEmailAndPassword', async () => {
        const loginData = { ok: true, ...userTest }
        const formData = { email: userTest.email, password: '' }

        await loginWithEmailAndPassword.mockResolvedValue(loginData)

        await startLoginWithEmailAndPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(userTest))
    })

    test('should call checking credentials and logout on error case in startLoginWithEmailAndPassword', async () => {
        const errorMessage = 'Neeel'
        const loginData = { ok: false, errorMessage }
        const formData = { email: userTest.email, password: '' }

        await loginWithEmailAndPassword.mockResolvedValue(loginData)

        await startLoginWithEmailAndPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage }))
    })

    test('should call logoutFirebase, clearNotes and logout', async () => {
        // await logoutFirebase.mockResolvedValue(undefined) // da igual si la llamo porque no retorna nada y no la estoy evaluando

        await startLogout()(dispatch)

        expect(logoutFirebase).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
        expect(dispatch).toHaveBeenCalledWith(logout())
    })
})