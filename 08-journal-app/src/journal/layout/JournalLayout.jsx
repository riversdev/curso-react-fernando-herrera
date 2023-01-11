import { Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import { Navbar, Sidebar } from '../components'

const drawerWidth = 240

export const JournalLayout = ({ children }) => {
    return (
        <Box
            className='box-shadow animate__animated animate__fadeIn animate__faster'
            sx={{
                display: 'flex'
            }}
        >
            <Navbar drawerWidth={drawerWidth} />
            <Sidebar drawerWidth={drawerWidth} />
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    p: 3,
                }}
            >
                <Toolbar></Toolbar>
                {children}
            </Box>
        </Box>
    )
}