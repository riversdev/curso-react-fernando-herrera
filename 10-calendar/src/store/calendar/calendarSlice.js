import { createSlice } from '@reduxjs/toolkit'

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoading: false,
        events: [],
        activeEvent: null,
    },
    reducers: {
        setIsLoading: (state) => {
            state.isLoading = true
        },
        setActiveEvent: (state, action) => {
            state.activeEvent = action.payload
            state.isLoading = false
        },
        addNewEvent: (state, action) => {
            state.events.push(action.payload)
            state.activeEvent = null
            state.isLoading = false
        },
        updateEvent: (state, action) => {
            state.events = state.events.map(x => x.id === action.payload.id ? action.payload : x)
            state.activeEvent = null
            state.isLoading = false
        },
        deleteEvent: (state) => {
            state.events = state.events.filter(x => x.id !== state.activeEvent.id)
            state.activeEvent = null
            state.isLoading = false
        },
        setEvents: (state, { payload = [] }) => {
            payload.forEach(x => {
                const exists = state.events.some(y => y.id === x.id)

                if (!exists) state.events.push(x)
            })

            state.isLoading = false
        },
        clearAllCalendar: (state) => {
            state.isLoading = false
            state.events = []
            state.activeEvent = null
        }
    },
})

export const {
    setIsLoading,
    setActiveEvent,
    addNewEvent,
    updateEvent,
    deleteEvent,
    setEvents,
    clearAllCalendar
} = calendarSlice.actions