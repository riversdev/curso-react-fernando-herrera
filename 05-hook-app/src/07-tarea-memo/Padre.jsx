import { useCallback, useState } from 'react'
import { Hijo } from './Hijo'

export const Padre = () => {
    const numeros = [2, 4, 6, 8, 10]
    const [value, setValue] = useState(0)

    const increment = useCallback(
        (num) => {
            setValue(value => value + num)
        },
        [],
    )

    return (
        <>
            <h1>Padre</h1>
            <p>Total: {value}</p>
            <hr />
            {
                numeros.map(n => (
                    <Hijo
                        key={n}
                        num={n}
                        increment={increment}
                    />
                ))
            }
        </>
    )
}