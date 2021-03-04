const { sign } = require('crypto')
const JWT = require('jsonwebtoken')

const createError = require('http-errors')
const { resolve } = require('path')

const signAcessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            'name': 'Yours Truly'
        }
        const options = {
            expiresIn: '30s',
            issuer: 'Mywebsite.com',
            audience: `${userId}`
        }

        JWT.sign(payload, process.env.ACCESS_SECRET_TOKEN, options, (err, token) => {
            if (err) {
                reject(createError(500))
            }
            resolve(token)

        })
    })
}
const signRefreshToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            'name': 'Yours Truly'
        }
        const options = {
            expiresIn: '1y',
            issuer: 'Mywebsite.com',
            audience: `${userId}`
        }

        JWT.sign(payload, process.env.REFRESH_TOKEN, options, (err, token) => {
            if (err) {
                reject(createError(500))
            }
            resolve(token)

        })
    })
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (typeof authHeader !== undefined) {
        const bearer = authHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        JWT.verify(req.token, process.env.ACCESS_SECRET_TOKEN, (err, payload) => {
            if (err) {
                const message = err.name === 'JsonWebTokenError' ? createError.Unauthorized() : err.name
                return next(message)
            } else {
                req.payload = payload
            }
        })
        next()
    }
    else {
        res.sendStatus(403)
        next();
    }
    next()
}

const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN, (err, payload) => {
            if (err) {
                console.log(err)
                //return reject(createError.BadRequest())
            } else {
                userId = payload.aud
                console.log(userId)
                resolve(userId)
            }
        })
    })

}

module.exports = { signAcessToken, verifyToken, signRefreshToken, verifyRefreshToken }