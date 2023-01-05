import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        counter: 0,
    },
    reducers: {
        increment: (state) => {
            state.counter += 1 // se pueden incluir acciones que muten el estado y esto funciona gracias a una libreria que esta dentro de redux :v
        },
        decrement: (state) => {
            state.counter -= 1
        },
        incrementByAmount: (state, action) => {
            console.log({ state, action })
            state.counter += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const incrementAsync = (amount) => (dispatch) => {
    setTimeout(() => {
        dispatch(incrementByAmount(amount))
    }, 1000)
}