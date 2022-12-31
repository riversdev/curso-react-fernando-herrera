import PropTypes from 'prop-types'
import { useForm } from '../hooks/useForm'

export const TodoItem = ({ id, description, done, handleDeleteTodo, handleToggleTodo }) => {
    const { complete, handleInputChange } = useForm({ complete: done })

    const handleToggle = e => {
        handleInputChange(e)
        handleToggleTodo(id)
    }

    return (
        <li className='list-group-item d-flex justify-content-between align-items-center'>
            <div className='form-check'>
                <input
                    className='form-check-input'
                    type='checkbox'
                    checked={complete}
                    id={'toggle' + id}
                    name='complete'
                    onChange={handleToggle}
                />
                <label
                    className={'form-check-label' + (done ? ' text-decoration-line-through' : '')}
                    htmlFor={'toggle' + id}>
                    {description}
                </label>
            </div>
            <button
                className='btn btn-sm btn-outline-danger'
                onClick={() => handleDeleteTodo(id)}>
                Eliminar
            </button>
        </li>
    )
}

TodoItem.propTypes = {
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    handleDeleteTodo: PropTypes.func.isRequired,
    handleToggleTodo: PropTypes.func.isRequired,
}