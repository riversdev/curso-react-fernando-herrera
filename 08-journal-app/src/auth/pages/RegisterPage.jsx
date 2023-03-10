import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useForm } from '../../hooks'
import { AuthLayout } from '../layout/AuthLayout'
import { startRegisterUserWithEmailAndPassword } from '../../store/auth'

const formdata = {
    displayName: '',
    email: '',
    password: '',
}

const formValidations = {
    displayName: [value => value.length >= 1],
    email: [value => value.includes('@'), 'El email debe tener una @ !'],
    password: [value => value.length >= 6, 'El password debe tener almenos 6 caracteres !'],
}

export const RegisterPage = () => {
    const { status, errorMessage } = useSelector(state => state.auth)
    const isAuthenticating = useMemo(() => status === 'checking', [status])
    const dispatch = useDispatch()
    const [formSubmitted, setFormSubmitted] = useState(false)
    const {
        formState, displayName, email, password, handleInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid,
    } = useForm(formdata, formValidations)

    const handleSubmit = e => {
        e.preventDefault()

        setFormSubmitted(true)

        if (!isFormValid || isAuthenticating) return

        dispatch(startRegisterUserWithEmailAndPassword(formState))
    }

    return (
        <AuthLayout title='Registro'>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <TextField
                            label='Nombre'
                            type='text'
                            placeholder='Alejandro Rios'
                            fullWidth
                            name='displayName'
                            value={displayName}
                            onChange={handleInputChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={formSubmitted ? displayNameValid : null}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <TextField
                            label='Correo'
                            type='email'
                            placeholder='example@mail.com'
                            fullWidth
                            name='email'
                            value={email}
                            onChange={handleInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={formSubmitted ? emailValid : null}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <TextField
                            label='Contrasena'
                            type='password'
                            placeholder='Contrasena'
                            fullWidth
                            name='password'
                            value={password}
                            onChange={handleInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={formSubmitted ? passwordValid : null}
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2 }} >
                        {
                            !!errorMessage &&
                            <Grid item xs={12}>
                                <Alert severity='error'>{errorMessage}</Alert>
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                variant='contained'
                                fullWidth
                                disabled={isAuthenticating}
                            >
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction='row' justifyContent='end'>
                        <Typography color='gray' sx={{ mr: 2 }}>Ya tienes una cuenta ?</Typography>
                        <Link
                            color='inherit'
                            component={RouterLink}
                            to='/auth/login'
                        >
                            Ingresar
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}