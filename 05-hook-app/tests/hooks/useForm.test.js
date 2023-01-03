import { renderHook, act } from '@testing-library/react'
import { useForm } from '../../src/hooks/useForm'

describe('useForm tests', () => {
    const initialForm = {
        name: 'Rivers',
        email: 'rivers@mail.com',
    }

    test('should return defect values', () => {
        const { result } = renderHook(() => useForm(initialForm))

        expect(result.current).toEqual({
            name: initialForm.name,
            email: initialForm.email,
            formState: initialForm,
            handleInputChange: expect.any(Function),
            resetForm: expect.any(Function)
        })
    })

    test('should change the name in the form', () => {
        const { result } = renderHook(() => useForm(initialForm))
        const { handleInputChange } = result.current

        const newName = 'Alejandro'

        act(() => handleInputChange({ target: { type: 'text', name: 'name', value: newName } }))

        expect(result.current.name).toBe(newName)
        expect(result.current.formState.name).toBe(newName)
    })

    test('should reset form', () => {
        const { result } = renderHook(() => useForm(initialForm))
        const { handleInputChange, resetForm } = result.current

        const newName = 'Alejandro'

        act(() => {
            handleInputChange({ target: { type: 'text', name: 'name', value: newName } })
            resetForm()
        })

        expect(result.current.name).toBe(initialForm.name)
        expect(result.current.formState.name).toBe(initialForm.name)
    })
})