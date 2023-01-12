import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from './journalSlice'
import { loadNotes } from '../../helpers/loadNotes'

export const startNewNote = () => async (dispatch, getState) => {
    const newNote = {
        title: '',
        body: '',
        date: new Date().getTime(),
    }

    dispatch(savingNewNote())

    const { uid } = getState().auth
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))

    await setDoc(newDoc, newNote)

    newNote.id = newDoc.id

    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
}

export const startLoadingNotes = () => async (dispatch, getState) => {
    const { uid } = getState().auth

    if (!uid) throw new Error('El uid del usuario no existe !')

    const notes = await loadNotes(uid)

    dispatch(setNotes(notes))
}