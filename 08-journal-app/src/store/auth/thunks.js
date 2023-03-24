import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailAndPassword, signInWithGoogle } from '../../firebase/providers'
import { checkingCredentials, login, logout } from './authSlice'
import { clearNotesLogout } from '../journal'

export const checkingAuthentication = () => async (dispatch, getState) => {
    dispatch(checkingCredentials())
}

export const startGoogleSignIn = () => async (dispatch, getState) => {
    dispatch(checkingCredentials())

    const { ok, errorMessage, ...result } = await signInWithGoogle()

    if (!ok) return dispatch(logout({ errorMessage }))

    dispatch(login(result))
}

export const startRegisterUserWithEmailAndPassword = ({ email, password, displayName }) => async (dispatch, getState) => {
    dispatch(checkingCredentials())

    const { ok, errorMessage, ...result } = await registerUserWithEmailAndPassword({ email, password, displayName })

    if (!ok) return dispatch(logout({ errorMessage }))

    dispatch(login(result))
}

export const startLoginWithEmailAndPassword = ({ email, password }) => async (dispatch, getState) => {
    dispatch(checkingCredentials())

    const { ok, errorMessage, ...result } = await loginWithEmailAndPassword({ email, password })

    if (!ok) return dispatch(logout({ errorMessage }))

    dispatch(login(result))
}

export const startLogout = () => async (dispatch, getState) => {
    await logoutFirebase()

    dispatch(clearNotesLogout())
    dispatch(logout())
}