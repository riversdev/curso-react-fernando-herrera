import { useDispatch, useSelector } from 'react-redux'
import { addNewEvent, deleteEvent, setActiveEvent, updateEvent } from '../store/calendar/calendarSlice'

export const useCalendarStore = () => {
    const { events, activeEvent } = useSelector(state => state.calendar)
    const dispatch = useDispatch()

    const startSetActiveEvent = (calendarEvent) => dispatch(setActiveEvent(calendarEvent))
    const startSavingEvent = (calendarEvent) => dispatch(calendarEvent._id ? updateEvent(calendarEvent) : addNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
    const startDeleteEvent = () => activeEvent ? dispatch(deleteEvent()) : null

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        startSetActiveEvent,
        startSavingEvent,
        startDeleteEvent,
    }
}