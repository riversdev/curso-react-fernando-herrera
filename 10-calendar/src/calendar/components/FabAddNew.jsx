import { addHours } from 'date-fns'
import { useCalendarStore, useUiStore } from '../../hooks'

export const FabAddNew = () => {
    const { startSetActiveEvent } = useCalendarStore()
    const { startOpenDateModal } = useUiStore()

    const addNewEvent = () => {
        startSetActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            // user: { _id: '123', name: 'Alejandro' } // ya se lo estoy agregando en el useCalendarStore
        })
        startOpenDateModal()
    }

    return (
        <button
            className='btn btn-primary fab'
            onClick={addNewEvent}
        >
            <i className='fas fa-plus'></i>
        </button>
    )
}