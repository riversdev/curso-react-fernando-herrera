import { fireEvent, render, screen } from '@testing-library/react'
import { MultipleCustomHooks } from '../../src/03-examples'
import { useCounter } from '../../src/hooks/useCounter'
import { useFetch } from '../../src/hooks/useFetch'

jest.mock('../../src/hooks/useFetch')
jest.mock('../../src/hooks/useCounter')

describe('tests MultipleCustomHooks', () => {
    const mockIncrement = jest.fn()

    useCounter.mockReturnValue({
        counter: 0,
        increment: mockIncrement
    })

    useFetch.mockReturnValue({
        data: null,
        isLoading: true,
        hasError: null
    })

    beforeEach(() => { // antes de cada prueba
        jest.clearAllMocks() // limpriar todos los mocks :v
    })

    test('should display defect component', () => {
        render(<MultipleCustomHooks />)

        expect(screen.getByText('Breaking Bad Quotes'))
        expect(screen.getByText('Loading...'))

        const nextButton = screen.getByRole('button', { name: 'Next quote' })

        expect(nextButton.disabled).toBeTruthy()
        // screen.debug()
    })

    test('should display a Quote', () => {
        useFetch.mockReturnValue({
            data: [{ author: 'Rivers', quote: 'Hello rivers !' }],
            isLoading: false,
            hasError: null
        })

        render(<MultipleCustomHooks />)

        expect(screen.getByText('Hello rivers !')).toBeTruthy()
        expect(screen.getByText('Rivers')).toBeTruthy()

        const nextButton = screen.getByRole('button', { name: 'Next quote' })

        expect(nextButton.disabled).toBeFalsy()

        // screen.debug()
    })

    test('should call the increment function', () => {
        useFetch.mockReturnValue({
            data: [{ author: 'Rivers', quote: 'Hello rivers !' }],
            isLoading: false,
            hasError: null
        })

        render(<MultipleCustomHooks />)

        const nextButton = screen.getByRole('button', { name: 'Next quote' })

        fireEvent.click(nextButton)

        expect(mockIncrement).toHaveBeenCalled()
    })
})