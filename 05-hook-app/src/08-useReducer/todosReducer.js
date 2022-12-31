export const initialState = []

export const initReducer = () => {
    return JSON.parse(localStorage.getItem('todos')) || []
}

export const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'add':
            return [...state, action.payload]

        case 'delete':
            return state.filter(x => x.id !== action.payload)

        case 'toggle':
            // return state.reduce((acc, curr) => [...acc, { ...curr, done: curr.id === action.payload ? !curr.done : curr.done }], [])
            return state.map(x => x.id === action.payload ? { ...x, done: !x.done } : x)

        default:
            return state
    }
}