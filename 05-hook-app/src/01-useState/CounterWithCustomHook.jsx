import { useCounter } from '../hooks/useCounter'

export const CounterWithCustomHook = () => {
    const { counter, increment, reset, decrement } = useCounter()

    return (
        <>
            <h1>Counter with hook: {counter}</h1>
            <hr />
            <button className='btn btn-primary' onClick={() => increment()}>+1</button>
            <button className='btn btn-primary' onClick={() => reset()}>Reset</button>
            <button className='btn btn-primary' onClick={() => decrement(5)}>-1</button>
        </>
    )
}