import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnection } from './database/config.js'
import { authRouter } from './routes/authRouter.js'
import { eventsRouter } from './routes/eventsRouter.js'

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
app.use('/api/events', eventsRouter)

// escuchando las peticiones
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`)
})