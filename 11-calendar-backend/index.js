import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { authRouter } from './routes/auth.js'
import { dbConnection } from './database/config.js'

dotenv.config()

// servidor de express
const app = express()

// bd
dbConnection()

// CORS
app.use(cors())

// directorio publico
app.use(express.static('public'))

// lectura y parseo del body
app.use(express.json())

// rutas
app.use('/api/auth', authRouter)

// escuchando las peticiones
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`)
})