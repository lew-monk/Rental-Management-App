const crypto = require('crypto')

const bycrypt = require('bcrypt')

const genPassword = (password) => {
    salt = crypto.randomBytes(16).toString('hex')
    hash = crypto.pbkdf2Sync(password, salt, 1000, 512, 'sha512').toString('hex')

    return { salt, hash }
}

const validatePassword = (password, salt, hash) => {
    const genhash = crypto.pbkdf2Sync(password, salt, 1000, 512, 'sha512').toString('hex')
    return hash === genhash
}




module.exports = { genPassword, validatePassword }