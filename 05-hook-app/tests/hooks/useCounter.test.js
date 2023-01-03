import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { useCounter } from '../../src/hooks/useCounter'

describe('tests useCounter', () => {
    test('should return defect values', () => {
        const { result } = renderHook(() => useCounter())
        const { counter, decrement, increment, reset } = result.current

        expect(counter).toBe(0)
        expect(decrement).toEqual(expect.any(Function))
        expect(increment).toEqual(expect.any(Function))
        expect(reset).toEqual(expect.any(Function))

        // console.log(result)
    })

    test('should return counter with value of 100', () => {
        const { result } = renderHook(() => useCounter(100))

        expect(result.current.counter).toBe(100)
    })

    test('should increment counter', () => {
        const { result } = renderHook(() => useCounter())
        const { increment } = result.current

        act(() => increment(100)) // siempre envolver el llamado a una funcion en un act

        expect(result.current.counter).toBe(100) // no usar un valor desestructurado en el expect porque no mantiene la referencia. Siempre evaluar desde el .current
    })

    test('should decrement counter', () => {
        const { result } = renderHook(() => useCounter(100))
        const { decrement } = result.current

        act(() => {
            decrement()
            decrement(2)
        })

        expect(result.current.counter).toBe(97)
    })

    test('should reset counter', () => {
        const { result } = renderHook(() => useCounter())
        const { reset, increment } = result.current

        act(() => increment())

        expect(result.current.counter).toBe(1)

        act(() => reset())

        expect(result.current.counter).toBe(0)
    })
})