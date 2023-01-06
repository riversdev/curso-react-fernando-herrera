import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import { useForm } from '../../hooks/useForm'
import { getHeroesByName } from '../helpers'
import { HeroCard } from '../components'
import 'animate.css'

const useSearch = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { q = '' } = queryString.parse(location.search)
    const heroes = getHeroesByName(q)
    const { searchText, handleInputChange } = useForm({ searchText: q })

    const handleSubmit = (e) => {
        e.preventDefault()

        navigate(`?q=${searchText}`)
    }

    return {
        q,
        heroes,
        searchText,
        handleInputChange,
        handleSubmit,
    }
}

export const SearchPage = () => {
    const { q, heroes, searchText, handleInputChange, handleSubmit } = useSearch()

    return (
        <>
            <h1>Search</h1>
            <hr />
            <div className='row'>
                <div className='col-5'>
                    <h4>Searching</h4>
                    <hr />
                    <form
                        autoComplete='off'
                        onSubmit={handleSubmit}
                    >
                        <div className='form-floating mb-3'>
                            <input
                                type='text'
                                className='form-control'
                                id='searchText'
                                name='searchText'
                                placeholder='Green Arrow'
                                value={searchText}
                                onChange={handleInputChange}
                            />
                            <label htmlFor='searchText'>Search a hero</label>
                        </div>
                        <button type='submit' className='btn btn-outline-dark'>Submit</button>
                    </form>
                </div>
                <div className='col-7'>
                    <h4>Results</h4>
                    <hr />
                    {
                        (q === '')
                            ? <div className='alert alert-info animate__animated animate__fadeIn'>Search a hero</div>
                            : (heroes.length === 0) && <div className='alert alert-danger animate__animated animate__fadeIn'>No hero with <b>{q}</b></div>
                    }
                    <div className='row g-3'>
                        {heroes.map(hero => (
                            <div key={hero.id} className='col-4'>
                                <HeroCard hero={hero} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}