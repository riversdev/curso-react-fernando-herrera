import { useTodos } from '../hooks'
import { TodoAdd, TodoList } from './'

export const TodoApp = () => {
    const { todos, todosCount, pendingTodosCount, handleAddTodo, handleDeleteTodo, handleToggleTodo } = useTodos()

    return (
        <>
            <h1>Todo App: {todosCount}, <small>pendientes: {pendingTodosCount}</small></h1>
            <hr />
            <div className='row'>
                <div className='col-7'>
                    <TodoList
                        todos={todos}
                        handleToggleTodo={handleToggleTodo}
                        handleDeleteTodo={handleDeleteTodo}
                    />
                </div>
                <div className='col-5'>
                    <h4>Agregar TODO</h4>
                    <hr />
                    <TodoAdd handleAddTodo={handleAddTodo} />
                </div>
            </div>
        </>
    )
}