import mongoose from 'mongoose'

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN)

        console.log('database online')
    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar conexion con la bd')
    }
}