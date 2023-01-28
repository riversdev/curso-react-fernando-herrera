import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useForm } from '../../hooks'
import { AuthLayout } from '../layout/AuthLayout'
import { startGoogleSignIn, startLoginWithEmailAndPassword } from '../../store/auth'

const initialForm = { email: '', password: '' }

export const LoginPage = () => {
    const { status, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { email, password, handleInputChange } = useForm(initialForm)
    const isAuthenticating = useMemo(() => status === 'checking', [status])

    const handleSubmit = e => {
        e.preventDefault()

        if (isAuthenticating) return

        dispatch(startLoginWithEmailAndPassword({ email, password }))
    }

    const handleGoogleSignIn = () => dispatch(startGoogleSignIn())

    return (
        <AuthLayout title='Login'>
            <form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <TextField
                            label='Correo'
                            type='email'
                            placeholder='example@mail.com'
                            fullWidth
                            name='email'
                            value={email}
                            onChange={handleInputChange}
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
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2 }} >
                        {
                            !!errorMessage &&
                            <Grid item xs={12}>
                                <Alert severity='error'>{errorMessage}</Alert>
                            </Grid>
                        }
                        <Grid item xs={12} sm={6}>
                            <Button
                                type='submit'
                                variant='contained'
                                fullWidth
                                disabled={isAuthenticating}
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant='contained'
                                fullWidth
                                disabled={isAuthenticating}
                                onClick={handleGoogleSignIn}
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }} >Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction='row' justifyContent='end'>
                        <Link
                            color='inherit'
                            component={RouterLink}
                            to='/auth/register'
                        >
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}