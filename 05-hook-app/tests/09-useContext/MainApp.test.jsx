import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MainApp } from '../../src/09-useContext/MainApp'

describe('tests MainApp', () => {
    test('should display HomePage', () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <MainApp />
            </MemoryRouter>
        )

        // expect(screen.getByText('About Page')).toBeTruthy()

        screen.debug()
    })
})