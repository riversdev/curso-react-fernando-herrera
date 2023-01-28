export const fileUpload = async (file) => {
    if (!file) throw new Error('No existe el archivo a subir !')

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dwjujtv6q/upload'
    const formData = new FormData()

    formData.append('upload_preset', 'react-journal')
    formData.append('file', file)

    try {
        const response = await fetch(cloudUrl, {
            method: 'POST',
            body: formData,
        })

        if (!response.ok) throw new Error('Imposible subir imagen !')

        const data = await response.json()

        return data.secure_url
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}