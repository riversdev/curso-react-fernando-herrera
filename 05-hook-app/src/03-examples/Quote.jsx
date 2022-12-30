import { useLayoutEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

export const Quote = ({ quote, author }) => {
    const pRef = useRef()
    const [boxSize, setBoxSize] = useState({ height: 0, width: 0 })

    useLayoutEffect(() => { // se usa para hacer un efecto cuando se termina de montar completamente el dom :v
        const { height, width } = pRef.current.getBoundingClientRect()

        setBoxSize({ height, width })
    }, [quote])

    return (
        <>
            <blockquote
                className='blockquote text-end'
                style={{ display: 'flex' }}
            >
                <p ref={pRef} className='mb-1'>{quote}</p>
                <footer className='blockquote-footer'>{author}</footer>
            </blockquote>
            <code>{JSON.stringify(boxSize)}</code>
        </>
    )
}

Quote.propTypes = {
    quote: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
}