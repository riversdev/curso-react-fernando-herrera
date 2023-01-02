import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { MainApp } from './MainApp'
import { HomePage } from './HomePage'
import { AboutPage } from './AboutPage'
import { LoginPage } from './LoginPage'

export const Routes = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <MainApp />,
            children: [
                {
                    path: '/',
                    element: <HomePage />,
                },
                {
                    path: 'about',
                    element: <AboutPage />,
                },
                {
                    path: 'login',
                    element: <LoginPage />,
                },
                {
                    path: '/*',
                    element: <Navigate to='/about' />,
                },
            ],
        },
    ])

    return <RouterProvider router={router} />
}