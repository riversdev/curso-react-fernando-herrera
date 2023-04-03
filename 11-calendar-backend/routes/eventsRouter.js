/*
    rutas de usuarios /api/events
*/

import { Router } from 'express'
import { check } from 'express-validator'
import { validarJWT } from '../middlewares/validar-jwt.js'
import { validarCampos } from '../middlewares/validar-campos.js'
import { isDate } from '../helpers/isDate.js'
import { deleteEvent, getEvents, postEvent, putEvent } from '../controllers/eventsController.js'

export const eventsRouter = Router()

// todas las rutas pasan por la validacion del JWT
eventsRouter.use(validarJWT)

// endpoints
eventsRouter.get('/', getEvents)

eventsRouter.post(
    '/',
    [
        check('title', 'El titulo el obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de fin es obligatoria').custom(isDate),
        validarCampos
    ],
    postEvent
)

eventsRouter.put(
    '/:id',
    [
        check('title', 'El titulo el obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de fin es obligatoria').custom(isDate),
        validarCampos
    ],
    putEvent
)

eventsRouter.delete('/:id', deleteEvent)