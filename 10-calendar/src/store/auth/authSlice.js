import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // authenticated, not-authenticated, checking
        user: null,
        errorMessage: null
    },
    reducers: {
        checking: (state) => {
            state.status = 'checking'
            state.errorMessage = null
        },
        login: (state, { payload }) => {
            state.status = 'authenticated'
            state.user = payload
            state.errorMessage = null
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated'
            state.user = null
            state.errorMessage = payload?.errorMessage
        }
    },
})

export const {
    checking,
    login,
    logout
} = authSlice.actions