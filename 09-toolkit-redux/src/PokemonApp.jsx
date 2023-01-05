import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons } from './store/slices/pokemon'

export const PokemonApp = () => {
    const { isLoading, page, pokemons } = useSelector((state) => state.pokemons)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPokemons(page))
    }, [])

    return (
        <>
            <h1>Pokemon App</h1>
            <hr />
            {isLoading && <p>Cargando...</p>}
            <ul>
                {pokemons.map(({ name, url }) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>
            <button
                disabled={isLoading}
                onClick={() => dispatch(getPokemons(page))}>
                Next
            </button>
        </>
    )
}