import { TodoItem } from './'
import PropTypes from 'prop-types'

export const TodoList = ({ todos, handleDeleteTodo, handleToggleTodo }) => {
    return (
        <ul className='list-group'>
            {
                todos.map(({ id, ...todo }) =>
                    <TodoItem
                        key={id}
                        id={id}
                        {...todo}
                        handleDeleteTodo={handleDeleteTodo}
                        handleToggleTodo={handleToggleTodo}
                    />
                )
            }
        </ul>
    )
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    handleDeleteTodo: PropTypes.func.isRequired,
    handleToggleTodo: PropTypes.func.isRequired,
}