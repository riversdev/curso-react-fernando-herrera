import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SearchPage } from '../../../src/heroes/pages/SearchPage'

const mockUseNavigate = jest.fn() // IMPORTANTE... el nombre siempre debe comenzar con "mock" = mockNombreDeLaConstante

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}))

describe('tests SearchPage', () => {
    beforeEach(() => jest.clearAllMocks())

    test('should display with defect values', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )

        expect(container).toMatchSnapshot()

        // screen.debug()
    })

    test('should display Batman and the input with queryString value', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox')
        const img = screen.getByRole('img')

        expect(input.value).toBe('batman')
        expect(img.src).toContain('/heroes/dc-batman.jpg')

        // screen.debug()
    })

    test('should display an error if the hero(batman123) is not found', () => {
        const heroNotFound = 'batman123'

        render(
            <MemoryRouter initialEntries={[`/search?q=${heroNotFound}`]}>
                <SearchPage />
            </MemoryRouter>
        )

        expect(screen.getByLabelText('alertToNotFound')).toBeTruthy()

        // screen.debug()
    })

    test('should call the navigate to the new screen', () => {
        const hero = 'green arrow'

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox')
        const submitBtn = screen.getByTestId('submitBtn')

        fireEvent.change(input, { target: { type: 'text', name: 'searchText', value: hero } })
        fireEvent.click(submitBtn)

        expect(mockUseNavigate).toHaveBeenCalled()
        expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${hero}`)

        // screen.debug()
    })
})