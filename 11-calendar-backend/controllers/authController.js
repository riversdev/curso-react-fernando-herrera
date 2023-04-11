import { request, response } from 'express'
import bcrypt from 'bcryptjs'
import { generarJWT } from '../helpers/jwt.js'
import { UserModel } from '../models/UserModel.js'

export const crearUsuario = async (req = request, res = response) => {
    const { name, email, password } = req.body

    try {
        // verificar que no exista un usuario con el mismo email
        let user = await UserModel.findOne({ email })
        if (user) return res.status(400).json({ ok: false, msg: 'Ya existe un usuario con el mismo email' })

        user = new UserModel(req.body)

        // encriptar password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        // guardar usuario
        await user.save()

        // generar JWT
        const token = await generarJWT(user.id, user.name)

        res.status(201).json({ ok: true, uid: user.id, name: user.name, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Error del servidor' })
    }
}

export const loginUsuario = async (req = request, res = response) => {
    const { email, password } = req.body

    try {
        // verificar que exista el usuario
        const user = await UserModel.findOne({ email })
        if (!user) return res.status(400).json({ ok: false, msg: 'No existe un usuario con ese email' })

        // confirmar password
        const isValidPassword = bcrypt.compareSync(password, user.password)
        if (!isValidPassword) return res.status(400).json({ ok: false, msg: 'El password es incorrecto' })

        // generar JWT
        const token = await generarJWT(user.id, user.name)

        res.status(200).json({ ok: true, uid: user.id, name: user.name, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Error del servidor' })
    }
}

export const revalidarToken = async (req = request, res = response) => {
    const { uid, name } = req

    const token = await generarJWT(uid, name)

    res.json({ ok: true, token, uid, name })
}