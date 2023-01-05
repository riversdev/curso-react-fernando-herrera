import { pokemonApi } from '../../../api/pokemonApi'
import { startLoadingPokemons, setPokemons } from './pokemonSlice'

export const getPokemons = (page = 0) => async (dispatch, getState) => {
    // const state = getState((state) => state.pokemons) // getState tiene el estado global

    dispatch(startLoadingPokemons())

    try {
        // const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${page * 10}&limit=10`)
        // const { status, data } = response
        const { status, data } = await pokemonApi.get(`/pokemon?offset=${page * 10}&limit=10`)

        if (status === 200)
            dispatch(setPokemons({ page: page + 1, pokemons: data.results }))
        else
            dispatch(setPokemons({ page, pokemons: [] }))
    } catch (error) {
        console.error(error)
        dispatch(setPokemons({ page, pokemons: [] }))
    }
}