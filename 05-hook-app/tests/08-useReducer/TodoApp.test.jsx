import { render, screen } from '@testing-library/react'
import { TodoApp } from '../../src/08-useReducer/TodoApp'
import { useTodos } from '../../src/hooks/useTodos'

// asi se hace un mock de un hook que esta dentro de un componente
jest.mock('../../src/hooks/useTodos')

describe('tests TodoApp', () => {
    const todos = [
        { id: 1, description: 'Buscar la gema del alma.', done: false },
        { id: 2, description: 'Buscar la gema del poder.', done: true },
        { id: 3, description: 'Buscar la gema del tiempo.', done: false },
    ]

    // para utilizar el mock se debe de iniciar con los valores que se ocupen en este momento para las prueba
    // si se necesita un mock de una funcion aqui... tambien se puede usar declarandola antes

    const handleAddTodoMock = jest.fn() // aqui no es necesario porque le tocaria hacer estas pruebas al TodoAdd que es el componente que manda llamar estas funciones
    const handleDeleteTodoMock = jest.fn()
    const handleToggleTodoMock = jest.fn()

    beforeEach(() => jest.clearAllMocks()) // en cada test se resetean todos los mocks para que no conserven sus valores anteriores

    useTodos.mockReturnValue({
        todos,
        todosCount: 3,
        pendingTodosCount: 2,
        handleAddTodo: handleAddTodoMock,
        handleDeleteTodo: handleDeleteTodoMock,
        handleToggleTodo: handleToggleTodoMock
    })

    test('should display full componenet', () => {
        render(<TodoApp />)

        todos.forEach(todo =>
            expect(screen.getByText(todo.description)).toBeTruthy()
        )

        // screen.debug()
    })
})