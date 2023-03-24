import { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from '../../../src/store/journal/journalSlice'
import { startDeletingNote, startLoadingNotes, startNewNote, startSaveNote, startUploadingFiles } from '../../../src/store/journal/thunks'
import { deleteAllDocs } from '../../fixtures/firebaseFixtures'
import { fullState } from '../../fixtures/journalFixtures'

describe('tests journal thunks', () => {
    const uid = 'TEST-UID' // user id

    const dispatch = jest.fn()
    const getState = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    test('should create a new note', async () => {
        getState.mockReturnValue({ auth: { uid } })

        await startNewNote()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledTimes(3)
        expect(dispatch).toHaveBeenCalledWith(savingNewNote())
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number),
            imageUrls: [],
        }))
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number),
            imageUrls: [],
        }))
    })

    test('should load notes', async () => {
        getState.mockReturnValue({ auth: { uid } })

        await startLoadingNotes()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(setNotes(expect.any(Array)))
        expect(dispatch).toHaveBeenCalledWith(setNotes(expect.arrayContaining([
            {
                id: expect.any(String),
                title: expect.any(String),
                body: expect.any(String),
                date: expect.any(Number),
                imageUrls: expect.any(Array),
            }
        ])))
    })

    test('should save the note', async () => {
        const state = { auth: { uid }, journal: fullState }

        getState.mockReturnValue(state)

        await startSaveNote()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(dispatch).toHaveBeenCalledWith(setSaving())
        expect(dispatch).toHaveBeenCalledWith(updateNote(state.journal.active))
    })

    test('should upload files', async () => {
        await startUploadingFiles([])(dispatch)

        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(dispatch).toHaveBeenCalledWith(setSaving())
        expect(dispatch).toHaveBeenCalledWith(setPhotosToActiveNote([]))
    })

    test('should delete the note', async () => {
        const state = { auth: { uid }, journal: fullState }

        getState.mockReturnValue(state)

        await startDeletingNote()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith(deleteNoteById(state.journal.active.id))
    })

    // descomentar para eliminar todas las notas del usuario
    // ahora mismo solo elimina la nota creada en el primer test
    test('should delete all notes in firestore', async () => {
        await deleteAllDocs(uid)
    })
})