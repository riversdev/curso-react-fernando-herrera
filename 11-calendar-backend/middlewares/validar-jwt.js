import { request, response } from 'express'
import jwt from 'jsonwebtoken'

export const validarJWT = (req = request, res = response, next) => {
    // x-token - headers

    const token = req.header('x-token')

    if (!token) return res.status(401).json({ ok: false, msg: 'No hay token en la peticion' })

    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED)
        const { uid, name } = payload

        req.uid = uid
        req.name = name

        next()
    } catch (error) {
        return res.status(401).json({ ok: false, msg: 'El token no es valido' })
    }
}