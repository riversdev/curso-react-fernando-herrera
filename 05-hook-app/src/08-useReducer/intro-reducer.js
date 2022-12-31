const initialState = [{
    id: 1,
    todo: 'Buscar la gema del alma',
    done: false,
}]

const todosReducer = (state = initialState, action = {}) => {
    if (action.type === 'add') {
        return [...state, action.payload]
    }

    return state
}


let todos = todosReducer()

const newTodo = {
    id: 2,
    todo: 'Buscar la gema del poder.',
    done: false,
}

const action = {
    type: 'add',
    payload: newTodo
}

todos = todosReducer(todos, action)

console.log(todos)