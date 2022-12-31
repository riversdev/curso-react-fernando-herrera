import { useEffect, useReducer } from 'react'
import { initReducer, initialState, todosReducer } from '../08-useReducer/todosReducer'

export const useTodos = () => {
    const [todos, dispatchTodos] = useReducer(todosReducer, initialState, initReducer)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const handleAddTodo = todo => dispatchTodos({ type: 'add', payload: todo })
    const handleDeleteTodo = id => dispatchTodos({ type: 'delete', payload: id })
    const handleToggleTodo = id => dispatchTodos({ type: 'toggle', payload: id })

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(x => !x.done).length,
        handleAddTodo,
        handleDeleteTodo,
        handleToggleTodo,
    }
}