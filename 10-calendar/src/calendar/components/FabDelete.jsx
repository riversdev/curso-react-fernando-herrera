import { useCalendarStore } from '../../hooks'

export const FabDelete = () => {
    const { hasEventSelected, startDeleteEvent } = useCalendarStore()

    const handleDelete = () => startDeleteEvent()

    if (!hasEventSelected) return

    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={handleDelete}
        >
            <i className='fas fa-trash-alt'></i>
        </button>
    )
}