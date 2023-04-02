import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

const events = [
    {
        _id: new Date().getTime(),
        title: 'Cumpleanios del jefe',
        notes: 'Hay que comprar pastel',
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: '#fafafa',
        user: { _id: '123', name: 'Alejandro' }
    }
]

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events,
        activeEvent: null,
    },
    reducers: {
        setActiveEvent: (state, action) => {
            state.activeEvent = action.payload
        },
        addNewEvent: (state, action) => {
            state.events.push(action.payload)
            state.activeEvent = null
        },
        updateEvent: (state, action) => {
            state.events = state.events.map(x => x._id === action.payload._id ? action.payload : x)
            state.activeEvent = null
        },
        deleteEvent: (state) => {
            state.events = state.events.filter(x => x._id !== state.activeEvent._id)
            state.activeEvent = null
        }
    },
})

export const {
    setActiveEvent,
    addNewEvent,
    updateEvent,
    deleteEvent
} = calendarSlice.actions