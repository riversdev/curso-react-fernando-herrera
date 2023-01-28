import { useMemo, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from '../../hooks'
import { ImageGallery } from '../components'
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal'

export const NoteView = () => {
    const { active: note, isSaving, messageSaved } = useSelector(state => state.journal)
    const dispatch = useDispatch()

    const { title, body, date, formState, handleInputChange } = useForm(note)

    const inputFileRef = useRef()

    const dateString = useMemo(() => {
        const newDate = new Date(date)

        return newDate.toUTCString()
    }, [date])

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {
        if (messageSaved !== '') {
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
    }, [messageSaved])

    const onSaveNote = () => dispatch(startSaveNote())

    const handleFileInputChange = ({ target: { files } }) => {
        if (files.length === 0) return

        dispatch(startUploadingFiles(files))
    }

    const handleDelete = () => dispatch(startDeletingNote())

    return (
        <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            className='box-shadow animate__animated animate__fadeIn animate__faster'
            sx={{
                mb: 1
            }}
        >
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
            </Grid>
            <Grid item>
                <input
                    ref={inputFileRef}
                    type='file'
                    multiple
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                />
                <IconButton
                    color='primary'
                    disabled={isSaving}
                    onClick={() => inputFileRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>
                <Button
                    color='primary'
                    onClick={onSaveNote}
                    disabled={isSaving}
                    sx={{ padding: 2 }}
                >
                    <SaveOutlined sx={{
                        fontSize: 30,
                        mr: 2,
                    }} />
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Ingresa un titulo'
                    label='Titulo'
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                    sx={{ border: 'none', mb: 1 }}
                />
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='Que sucedio hoy ?'
                    name='body'
                    value={body}
                    onChange={handleInputChange}
                    minRows={5}
                />
            </Grid>
            <Grid container justifyContent='end'>
                <Button
                    color='error'
                    sx={{ mt: 2 }}
                    onClick={handleDelete}
                >
                    <DeleteOutline />
                    Eliminar
                </Button>
            </Grid>
            <ImageGallery images={note.imageUrls} />
        </Grid>
    )
}