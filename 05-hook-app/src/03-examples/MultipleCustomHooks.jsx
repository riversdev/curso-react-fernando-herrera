import { useCounter, useFetch } from '../hooks'
import { LoadingQuote, Quote } from './'

export const MultipleCustomHooks = () => {
    const { counter, increment } = useCounter(1)
    const { data, isLoading, hasError } = useFetch(`https://api.breakingbadquotes.xyz/v1/quotes/${counter}`)
    const { quote, author } = !!data && data[0] // doble negacion // data = null (aveces) // !!null = false porque !null = true

    return (
        <>
            <h1>Breaking Bad Quotes</h1>
            <hr />
            {isLoading ? <LoadingQuote /> : <Quote quote={quote} author={author} />}
            <button
                className='btn btn-primary'
                disabled={isLoading}
                onClick={() => increment()}
            >
                Next quote
            </button>
        </>
    )
}