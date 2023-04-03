/*
    rutas de usuarios /api/auth
*/

import { Router } from 'express'
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'
import { validarJWT } from '../middlewares/validar-jwt.js'
import { crearUsuario, loginUsuario, revalidarToken } from '../controllers/authController.js'

export const authRouter = Router()

authRouter.post(
    '/new',
    // middlewares
    [
        check('name', 'El nombre el obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener almenos 6 caracteres').isLength({ min: 6 }),
        validarCampos,
    ],
    crearUsuario
)

authRouter.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener almenos 6 caracteres').isLength({ min: 6 }),
        validarCampos,
    ],
    loginUsuario
)

authRouter.get(
    '/renew',
    [
        validarJWT
    ],
    revalidarToken
)