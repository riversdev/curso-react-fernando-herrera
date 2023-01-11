import { signInWithGoogle } from '../../firebase/providers'
import { checkingCredentials, login, logout } from './authSlice'

export const checkingAuthentication = ({ email, password }) => async (dispatch, getState) => {
    dispatch(checkingCredentials())
}

export const startGoogleSignIn = () => async (dispatch, getState) => {
    dispatch(checkingCredentials())

    const result = await signInWithGoogle()

    if (!result.ok) return dispatch(logout(result.errorMessage))

    dispatch(login(result))
}