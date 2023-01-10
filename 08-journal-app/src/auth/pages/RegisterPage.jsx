import { Link as RouterLink } from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'

export const RegisterPage = () => {
    return (
        <AuthLayout title='Registro'>
            <form>
                <Grid container>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <TextField
                            label='Nombre'
                            type='text'
                            placeholder='Alejandro Rios'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <TextField
                            label='Correo'
                            type='email'
                            placeholder='example@mail.com'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <TextField
                            label='Contrasena'
                            type='password'
                            placeholder='Contrasena'
                            fullWidth
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2 }} >
                        <Grid item xs={12}>
                            <Button variant='contained' fullWidth>Crear cuenta</Button>
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