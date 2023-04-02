import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { calendarLocalizer, getMessagesES } from '../../helpers'
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '../components'
import { useCalendarStore, useUiStore } from '../../hooks'

export const CalendarPage = () => {
    const { events, startSetActiveEvent } = useCalendarStore()
    const { startOpenDateModal } = useUiStore()
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

    const eventStyleGetter = (event, start, end, isSelected) => {
        // console.log({ event, start, end, isSelected })

        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    const handleSelect = (calendarEvent) => startSetActiveEvent({ ...calendarEvent })
    const handleDoubleClick = () => startOpenDateModal()
    const handleViewChange = (view) => {
        setLastView(view)
        localStorage.setItem('lastView', view)
    }

    return (
        <>
            <Navbar />
            <Calendar
                culture='es'
                localizer={calendarLocalizer}
                events={events}
                defaultView={lastView}
                startAccessor='start'
                endAccessor='end'
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onSelectEvent={handleSelect}
                onDoubleClickEvent={handleDoubleClick}
                onView={handleViewChange}
            />
            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>
    )
}