import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout'
import { AddOutlined } from '@mui/icons-material'
import { NoteView, NothingSelectedView } from '../views'
import { startNewNote } from '../../store/journal/thunks'

export const JournalPage = () => {
    const { isSaving, active } = useSelector(state => state.journal)
    const dispatch = useDispatch()

    const handleClickOnNewNote = () => dispatch(startNewNote())

    return (
        <JournalLayout>
            {!!active ? <NoteView /> : <NothingSelectedView />}
            <IconButton
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': {
                        backgroundColor: 'error.main',
                        opacity: 0.9,
                    },
                    ':disabled': {
                        backgroundColor: 'error.main',
                        opacity: 0.7,
                    },
                    position: 'fixed',
                    right: 50,
                    bottom: 50,
                }}
                disabled={isSaving}
                onClick={handleClickOnNewNote}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>
        </JournalLayout>
    )
}