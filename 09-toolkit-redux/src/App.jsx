import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementAsync, incrementByAmount } from './store/slices/counter'
import './App.css'

const App = () => {
  const { counter } = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  return (
    <div className="App">
      <h1>Vite + React</h1>
      <h1>count is {counter}</h1>
      <div className="card">
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>Increment by amount</button>
        <button onClick={() => dispatch(incrementAsync(5))}>Increment async by amount</button>
      </div>
    </div>
  )
}

export default App