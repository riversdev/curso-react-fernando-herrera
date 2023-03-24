export const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
}

export const emptyNote = {
    id: 'noteTestId-1',
    title: '',
    body: '',
    date: new Date().getTime(),
    imageUrls: [],
}

export const notes = [
    { ...emptyNote },
    {
        id: 'noteTestId-2',
        title: '',
        body: '',
        date: new Date().getTime(),
        imageUrls: [],
    },
    {
        id: 'noteTestId-3',
        title: '',
        body: '',
        date: new Date().getTime(),
        imageUrls: [],
    },
]

export const fullState = {
    isSaving: false,
    messageSaved: '',
    notes: [...notes],
    active: { ...emptyNote },
}