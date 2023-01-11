import { Grid, Typography } from '@mui/material'

export const AuthLayout = ({ title = '', children }) => {
    return (
        <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{
                minHeight: '100vh',
                backgroundColor: 'primary.main',
                padding: 4,
            }}
        >
            <Grid
                item
                className='box-shadow animate__animated animate__fadeIn animate__faster'
                // xs={12} // habilitar solo con el direction row del padre, sino ponerle un width a este
                // sm={8}
                // md={6}
                // lg={4}
                // xl={3}
                sx={{
                    width: { sm: 450 },
                    backgroundColor: 'white',
                    padding: 3,
                    borderRadius: 2,
                }}
            >
                <Typography variant='h5' sx={{ mb: 3 }}>{title}</Typography>
                {children}
            </Grid>
        </Grid>
    )
}