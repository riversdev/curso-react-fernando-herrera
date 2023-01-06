import { useMemo } from 'react'
import { HeroCard } from './'
import { getHeroesByPublisher } from '../helpers'

export const HeroList = ({ publisher }) => {
    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher])

    return (
        <div className='row row-cols-md-5 g-4'>
            {heroes && heroes.map(hero => (
                <HeroCard
                    key={hero.id}
                    hero={hero}
                />
            ))}
        </div>
    )
}