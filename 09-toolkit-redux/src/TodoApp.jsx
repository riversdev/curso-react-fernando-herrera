import { useState } from 'react'
import { useGetTodoQuery, useGetTodosQuery } from './store/apis/todosApi'

export const TodoApp = () => {
    // const state = useSelector(state => state.todos) // tambien estan aqui pero mejor consumirlos desde el hook
    // console.log(state)

    // const { data: todos, isLoading } = useGetTodosQuery()
    const [todoId, setTodoId] = useState(1)
    const { data: todo, isLoading } = useGetTodoQuery(todoId)

    const nextTodo = () => setTodoId(todoId + 1)
    const prevTodo = () => setTodoId(todoId === 1 ? 1 : todoId - 1)

    return (
        <>
            <h1>Todos - RTK Query</h1>
            <hr />
            <h4>isLoading: {isLoading ? 'SI' : 'NO'}</h4>
            <pre>{JSON.stringify(todo, null, 3)}</pre>
            <button onClick={prevTodo}>Prev todo</button>
            <button onClick={nextTodo}>Next todo</button>
            {/* <ul>
                {todos && todos.map(({ id, userId, title, completed }) => (
                    <li key={id}>
                        <strong>{completed ? 'DONE' : 'PENDING'}</strong>
                        {title}
                    </li>
                ))}
            </ul> */}
        </>
    )
}