import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from '../../src/helpers/fileUpload'

cloudinary.config({
    cloud_name: 'dwjujtv6q',
    api_key: '562756892677716',
    api_secret: 'cN8SSFqs_atTdURDvf5NoLRX_kE',
    secure: true,
})

describe('tests fileUpload', () => {
    test('should upload the file correctly', async () => {
        const imageUrl = 'https://images.unsplash.com/photo-1612441804231-77a36b284856?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBsYW5kc2NhcGV8ZW58MHx8MHx8&w=1000&q=80'
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        const file = new File([blob], 'foto.jpg')

        const url = await fileUpload(file)

        expect(typeof url).toBe('string')

        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg', '')

        const cloudResponse = await cloudinary.api.delete_resources([`journal/${imageId}`], { resource_type: 'image' })

        // console.log({ cloudResponse })
    })

    test('should return null', async () => {
        const file = new File([], 'foto.jpg')

        const url = await fileUpload(file)

        expect(url).toEqual(null)
    })
})