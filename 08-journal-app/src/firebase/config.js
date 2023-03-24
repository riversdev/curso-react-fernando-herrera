// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getEnvironments } from '../helpers/getEnvironments'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// console.log(process.env)
// console.log(import.meta.env)

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: 'AIzaSyCZM8W4d8igzaFw_khl44NKUxY43FD_pKM',
//     authDomain: 'curso-react-fernando-herrera.firebaseapp.com',
//     projectId: 'curso-react-fernando-herrera',
//     storageBucket: 'curso-react-fernando-herrera.appspot.com',
//     messagingSenderId: '361344237380',
//     appId: '1:361344237380:web:65fd8855469e327d0f2111'
// }


const {
    VITE_APIKEY,
    VITE_AUTHDOMAIN,
    VITE_PROJECTID,
    VITE_STORAGEBUCKET,
    VITE_MESSAGINGSENDERID,
    VITE_APPID
} = getEnvironments()

const firebaseConfig = {
    apiKey: VITE_APIKEY,
    authDomain: VITE_AUTHDOMAIN,
    projectId: VITE_PROJECTID,
    storageBucket: VITE_STORAGEBUCKET,
    messagingSenderId: VITE_MESSAGINGSENDERID,
    appId: VITE_APPID
}

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)

export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)