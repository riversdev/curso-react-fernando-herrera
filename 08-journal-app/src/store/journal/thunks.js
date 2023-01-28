import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice'
import { loadNotes, fileUpload } from '../../helpers'

export const startNewNote = () => async (dispatch, getState) => {
    const newNote = {
        title: '',
        body: '',
        date: new Date().getTime(),
        imageUrls: [],
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

export const startSaveNote = () => async (dispatch, getState) => {
    dispatch(setSaving())

    const { uid } = getState().auth
    const { active: note } = getState().journal
    const noteToFirestore = { ...note }

    delete noteToFirestore.id

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)

    await setDoc(docRef, noteToFirestore, { merge: true })

    dispatch(updateNote(note))
}

export const startUploadingFiles = (files = []) => async (dispatch, getState) => {
    dispatch(setSaving())

    const fileUploadPromises = []

    for (const file of files) {
        fileUploadPromises.push(fileUpload(file))
    }

    const photosUrls = await Promise.all(fileUploadPromises)

    dispatch(setPhotosToActiveNote(photosUrls))
}

export const startDeletingNote = () => async (dispatch, getState) => {
    const { uid } = getState().auth
    const { active: note } = getState().journal

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)

    await deleteDoc(docRef)

    dispatch(deleteNoteById(note.id))
}