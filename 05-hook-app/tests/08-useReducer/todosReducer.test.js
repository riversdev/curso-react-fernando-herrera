import { todosReducer } from '../../src/08-useReducer/todosReducer'

describe('test todosReducer', () => {
    const initialState = [{
        id: 1,
        description: 'Demo TODO',
        done: false,
    }]

    test('should return initial state', () => {
        const newState = todosReducer(initialState, {})

        expect(newState).toEqual(initialState) // tambien funcionaria el toBe porque para este caso ESPECIFICO esta apuntando al mismo espacio en memoria
    })

    test('should add a todo', () => {
        const action = {
            type: 'add',
            payload: {
                id: 2,
                description: 'Demo 2',
                done: false
            }
        }

        const newState = todosReducer(initialState, action)

        expect(newState.length).toBe(2)
        expect(newState).toContain(action.payload)
    })

    test('should delete a todo', () => {
        const action = {
            type: 'delete',
            payload: 1
        }

        const newState = todosReducer(initialState, action)

        expect(newState.length).toBe(0)
        expect(newState).not.toContain(initialState[0])
    })

    test('should toggle a todo', () => {
        const action = {
            type: 'toggle',
            payload: 1
        }

        const newState = todosReducer(initialState, action)

        expect(newState.length).toBe(1)
        expect(newState[0].done).toBeTruthy()
        expect(newState[0].done).toBe(!initialState.done)

        const newState2 = todosReducer(newState, action) // para volver a llamar un reducer solo se invoca denuevo pero con el estado de la invocacion anterior

        expect(newState2[0].done).toBeFalsy()
    })
})