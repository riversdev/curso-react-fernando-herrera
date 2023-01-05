import { createSlice } from '@reduxjs/toolkit'

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        isLoading: false,
        page: 0,
        pokemons: [],
    },
    reducers: {
        startLoadingPokemons: (state) => {
            state.isLoading = true
        },
        setPokemons: (state, action) => {
            state.isLoading = false
            state.page = action.payload.page
            state.pokemons = action.payload.pokemons
        },
    },
})

export const { startLoadingPokemons, setPokemons } = pokemonSlice.actions