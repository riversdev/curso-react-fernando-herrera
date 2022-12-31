import { useForm } from '../hooks/useForm'
import PropTypes from 'prop-types'

export const TodoAdd = ({ handleAddTodo }) => {
    const { handleInputChange, resetForm, description } = useForm({ description: '' })

    const handleSubmit = e => {
        e.preventDefault()

        if (description.trim().length <= 5) return

        const newTodo = {
            id: new Date().getTime(),
            description,
            done: false,
        }

        handleAddTodo && handleAddTodo(newTodo) // si existe la ejecuto
        resetForm()
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='description'
                placeholder='Que hay que hacer ?'
                className='form-control'
                value={description}
                onChange={handleInputChange}
            />
            <button
                type='submit'
                className='btn btn-primary mt-3'
                disabled={description.trim() === ''}
            >
                Agregar
            </button>
        </form>
    )
}

TodoAdd.propTypes = {
    handleAddTodo: PropTypes.func.isRequired,
}