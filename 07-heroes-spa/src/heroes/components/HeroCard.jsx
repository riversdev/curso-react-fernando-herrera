import { Link } from 'react-router-dom'

export const HeroCard = ({ hero }) => {
    const { id, superhero, publisher, alter_ego, first_appearance, characters } = hero

    const heroImageUrl = `/assets/heroes/${id}.jpg`

    return (
        <div className='col'>
            <div className='card'>
                <img src={heroImageUrl} className='card-img-top' alt={superhero} />
                <div className='card-body'>
                    <h5 className='card-title'>{superhero}</h5>
                    <p className='card-text'>{alter_ego}</p>
                    {alter_ego !== characters && <p className='card-text'>{characters}</p>}
                    <p className='card-text'>
                        <small className='text-muted'>{first_appearance}</small>
                    </p>
                    <Link to={`/hero/${id}`} className='btn btn-outline-dark'>Mas...</Link>
                </div>
            </div>
        </div>
    )
}