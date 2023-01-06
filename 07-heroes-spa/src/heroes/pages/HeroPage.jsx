import { useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getHeroById } from '../helpers'
import 'animate.css'

export const HeroPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const hero = useMemo(() => getHeroById(id), [id])
    const heroImageUrl = `/assets/heroes/${id}.jpg`

    const handleNavigateBack = () => navigate(-1)

    if (!hero)
        return <Navigate to='/marvel' />

    const { superhero, publisher, alter_ego, first_appearance, characters } = hero

    return (
        <div className='row'>
            <div className='col-6'>
                <div className='card'>
                    <div className='row g-0'>
                        <div className='col-md-4'>
                            <img src={heroImageUrl} className='img-fluid rounded-start animate__animated animate__fadeInLeft' alt={superhero} />
                        </div>
                        <div className='col-md-8'>
                            <div className='card-body h-100 d-flex align-items-between flex-wrap'>
                                <div>
                                    <h5 className='card-title'>{superhero}</h5>
                                    <p className='card-text'>{alter_ego}</p>
                                    <p className='card-text'>{publisher}</p>
                                    {alter_ego !== characters && <p className='card-text'>{characters}</p>}
                                    <p className='card-text'>
                                        <small className='text-muted'>{first_appearance}</small>
                                    </p>
                                </div>
                                <div className='w-100 d-flex justify-content-end align-items-end'>
                                    <button
                                        className='btn btn-outline-dark'
                                        onClick={handleNavigateBack}
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}