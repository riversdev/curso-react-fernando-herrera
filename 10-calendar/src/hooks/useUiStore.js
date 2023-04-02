import { useDispatch, useSelector } from 'react-redux'
import { closeDateModal, openDateModal } from '../store/ui/uiSlice'

export const useUiStore = () => {
    const { isDateModalOpen } = useSelector(state => state.ui)
    const dispatch = useDispatch()

    const startOpenDateModal = () => dispatch(openDateModal())
    const startCloseDateModal = () => dispatch(closeDateModal())
    const startToggleDateModal = () => isDateModalOpen ? startCloseDateModal() : startOpenDateModal()

    return {
        isDateModalOpen,

        startOpenDateModal,
        startCloseDateModal,
        startToggleDateModal
    }
}