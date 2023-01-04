import { fireEvent, render, screen } from '@testing-library/react'
import { TodoItem } from '../../src/08-useReducer/TodoItem'

describe('tests TodoItem', () => {
    const todo = {
        id: 1,
        description: 'Buscar la gema del alma.',
        done: false
    }

    const handleDeleteTodoMock = jest.fn() // ponerle Mock para distinguirlas
    const handleToggleTodoMock = jest.fn() // ponerle Mock para distinguirlas

    beforeEach(() => jest.clearAllMocks()) // en cada test se resetean todos los mocks

    test('should display todo pending', () => {
        render(
            <TodoItem
                {...todo}
                handleDeleteTodo={handleDeleteTodoMock}
                handleToggleTodo={handleToggleTodoMock}
            />
        )

        const liElement = screen.getByRole('listitem')
        const checkLabel = screen.getByLabelText('checkLabel') // aria-label // atributo en el elemento

        expect(liElement.className).toBe('list-group-item d-flex justify-content-between align-items-center')
        expect(checkLabel.className).not.toContain('text-decoration-line-through') // no contiene ese texto

        // screen.debug()
    })

    test('should display todo completed', () => {
        todo.done = true

        render(
            <TodoItem
                {...todo}
                handleDeleteTodo={handleDeleteTodoMock}
                handleToggleTodo={handleToggleTodoMock}
            />
        )

        const checkLabel = screen.getByLabelText('checkLabel') // aria-label // atributo en el elemento

        expect(checkLabel.className).toContain('text-decoration-line-through') // contiene ese texto

        // screen.debug()
    })

    test('should call toggle on click', () => {
        render(
            <TodoItem
                {...todo}
                handleDeleteTodo={handleDeleteTodoMock}
                handleToggleTodo={handleToggleTodoMock}
            />
        )

        const checkElement = screen.getByTestId('toggle1') // data-testid // atributo en el elemento

        fireEvent.click(checkElement, { target: { type: 'checkbox', name: 'complete', checked: true } })

        // no es necesario verificar que se haya cambiado el toggle 
        // porque es tarea del reducer en este caso
        // porque el reducer tiene la funcion que recibe y manipula el cambio
        // lo que si se debe hacer aqui es:
        //  verificar que la funcion haya sido llamada (el mock haya sido llamado)
        //  verificar que el mock haya sido llamado con los parametro necesarios

        expect(handleToggleTodoMock).toHaveBeenCalled()
        expect(handleToggleTodoMock).toHaveBeenCalledWith(todo.id)

        // screen.debug()
    })

    test('should call delete on click', () => {
        render(
            <TodoItem
                {...todo}
                handleDeleteTodo={handleDeleteTodoMock}
                handleToggleTodo={handleToggleTodoMock}
            />
        )

        const deleteBtn = screen.getByText('Eliminar') // texto dentro del elemento

        fireEvent.click(deleteBtn)

        expect(handleDeleteTodoMock).toHaveBeenCalled()
        expect(handleDeleteTodoMock).toHaveBeenCalledWith(todo.id)

        // screen.debug()
    })
})