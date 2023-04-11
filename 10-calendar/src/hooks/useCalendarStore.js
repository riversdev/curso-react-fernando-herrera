import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { calendarApi } from '../api'
import { convertEventsToDateEvents } from '../helpers'
import { addNewEvent, deleteEvent, setActiveEvent, setEvents, setIsLoading, updateEvent } from '../store/calendar/calendarSlice'

export const useCalendarStore = () => {
    const { user } = useSelector(state => state.auth)
    const { events, activeEvent } = useSelector(state => state.calendar)
    const dispatch = useDispatch()

    const startSetActiveEvent = (calendarEvent) => dispatch(setActiveEvent(calendarEvent))
    const startSavingEvent = async (calendarEvent) => {
        dispatch(setIsLoading())

        try {
            if (calendarEvent.id) {
                const { data: { event } } = await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)

                dispatch(updateEvent({ ...calendarEvent, user }))
            } else {
                const { data: { event } } = await calendarApi.post('/events', calendarEvent)

                dispatch(addNewEvent({ ...calendarEvent, id: event.id, user }))
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Error al guardar', error.response.data.msg, 'error')
        }
    }
    const startDeleteEvent = async () => {
        if (!activeEvent) return

        dispatch(setIsLoading())

        try {
            await calendarApi.delete(`/events/${activeEvent.id}`)

            dispatch(deleteEvent())
        } catch (error) {
            console.log(error)
            Swal.fire('Error al eliminar', error.response.data.msg, 'error')
        }
    }
    const startLoadingEvents = async () => {
        dispatch(setIsLoading())

        try {
            const { data: { events } } = await calendarApi.get('/events')
            const convertedEvents = convertEventsToDateEvents(events)

            dispatch(setEvents(convertedEvents))
        } catch (error) {
            console.log(error)
        }
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        startSetActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        startLoadingEvents,
    }
}