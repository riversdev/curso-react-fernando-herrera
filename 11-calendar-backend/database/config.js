import mongoose from 'mongoose'

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN)
        // segundo parametro del connect
        // {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // }

        console.log('db online')
    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar conexion con la bd')
    }
}

// mongo db user
// mern_user
// rJQv5tefDz4fEK13