import jwt from 'jsonwebtoken'

// se crea una promesa porque la libreria jsonwebtoken trabaja con callbacks y yo no quiero xd
export const generarJWT = (uid, name) => new Promise((resolve, reject) => {
    const payload = { uid, name }

    jwt.sign(
        payload,
        process.env.SECRET_JWT_SEED,
        {
            expiresIn: '2h',
        },
        (error, token) => {
            if (error) {
                console.log('No se pudo firmar el token')
                reject(error)
            }

            resolve(token)
        }
    )
})