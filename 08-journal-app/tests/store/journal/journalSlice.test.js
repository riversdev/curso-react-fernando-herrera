import { addNewEmptyNote, clearNotesLogout, deleteNoteById, journalSlice, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from '../../../src/store/journal/journalSlice'
import { emptyNote, fullState, initialState, notes } from '../../fixtures/journalFixtures'

describe('tests journalSlice', () => {
    test('should return the initial state', () => {
        const state = journalSlice.reducer(initialState, {})

        expect(state).toEqual(initialState)
        expect(journalSlice.name).toBe('journal')
    })

    test('should change the state a saving', () => {
        const action = savingNewNote()

        const state = journalSlice.reducer(initialState, action)

        expect(state.isSaving).toBeTruthy()
    })

    test('should change the state a saving', () => {
        const action = setSaving()

        const state = journalSlice.reducer(initialState, action)

        expect(state.isSaving).toBeTruthy()
        expect(state.messageSaved).toBe('')
    })

    test('should add new empty note', () => {
        const action = addNewEmptyNote(emptyNote)

        const state = journalSlice.reducer(initialState, action)

        expect(state.isSaving).toBeFalsy()
        expect(state.notes.filter(x => x.id === emptyNote.id)[0]).toEqual(emptyNote)
    })

    test('should active note', () => {
        const action = setActiveNote(emptyNote)

        const state = journalSlice.reducer(initialState, action)

        expect(state.active).toEqual(emptyNote)
        expect(state.messageSaved).toBe('')
    })

    test('should set notes', () => {
        const action = setNotes(notes)

        const state = journalSlice.reducer(initialState, action)

        expect(state.notes).toEqual(notes)
    })

    test('should update note', () => {
        const note = { ...emptyNote, title: 'Edited note' }
        const action = updateNote(note)

        const state = journalSlice.reducer(fullState, action)

        expect(state.isSaving).toBeFalsy()
        expect(state.notes.filter(x => x.id === note.id)[0]).toEqual(note)
        expect(state.messageSaved).toBe(`${note.title}, actualizada correctamente !`)
    })

    test('should set photos to active note', () => {
        const photos = ['photo1', 'photo2', 'photo3']
        const action = setPhotosToActiveNote(photos)

        const state = journalSlice.reducer(fullState, action)

        expect(state.active.imageUrls).toEqual(photos)
        expect(state.isSaving).toBeFalsy()
    })

    test('should delete note by id', () => {
        const noteId = notes[1].id
        const action = deleteNoteById(noteId)

        const state = journalSlice.reducer(fullState, action)

        expect(state.notes.filter(x => x.id === noteId).length).toBe(0)
        expect(state.active).toBe(null)
    })

    test('should clear all notes on logout', () => {
        const action = clearNotesLogout()

        const state = journalSlice.reducer(fullState, action)

        expect(state).toEqual(initialState)
    })
})