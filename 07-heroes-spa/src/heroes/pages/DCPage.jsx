import { HeroList } from '../components'

export const DCPage = () => {
    const publisher = 'DC Comics'

    return (
        <>
            <h1>{publisher}</h1>
            <hr />
            <HeroList publisher={publisher} />
        </>
    )
}