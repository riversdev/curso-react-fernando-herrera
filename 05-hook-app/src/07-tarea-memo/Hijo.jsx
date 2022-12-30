import { memo } from 'react'

export const Hijo = memo(({ increment, num }) => {
    console.log('Me volví a generar :(');

    return (
        <button
            className='btn btn-primary mr-3'
            onClick={() => increment(num)}
        >
            {num}
        </button>
    )
})