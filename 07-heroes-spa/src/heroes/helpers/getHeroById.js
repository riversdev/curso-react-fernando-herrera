import { heroes } from '../data/heroes'

export const getHeroById = (id) => {
    return heroes.find(x => x.id === id)
}