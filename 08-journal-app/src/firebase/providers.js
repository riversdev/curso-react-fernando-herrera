import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { FirebaseAuth } from './config'

const googleAuthProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleAuthProvider)
        // const credentials = GoogleAuthProvider.credentialFromResult(result) // aqui vienen las credenciales
        const { uid, email, displayName, photoURL } = result.user

        return {
            ok: true,
            uid,
            email,
            displayName,
            photoURL,
        }
    } catch (error) {
        console.error(error)

        return { ok: false, errorCode: error.code, errorMessage: error.message }
    }
}

export const registerUserWithEmailAndPassword = async ({ email, password, displayName }) => {
    try {
        const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = response.user

        await updateProfile(FirebaseAuth.currentUser, { displayName })

        return {
            ok: true,
            uid,
            email,
            displayName,
            photoURL,
        }
    } catch (error) {
        console.error(error)

        return { ok: false, errorCode: error.code, errorMessage: error.message }
    }
}

export const loginWithEmailAndPassword = async ({ email, password }) => {
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, displayName, photoURL } = result.user

        return {
            ok: true,
            uid,
            email,
            displayName,
            photoURL,
        }
    } catch (error) {
        console.error(error)

        return { ok: false, errorCode: error.code, errorMessage: error.message }
    }
}

export const logoutFirebase = async () => await FirebaseAuth.signOut()