const Admin = require('../../Models/Admin/AdminModel')
const multer = require('multer')

const fs = require('fs')

const { signAcessToken, signRefreshToken, verifyRefreshToken } = require('../../config/JWT_token')

const password = require('../../config/Password.util')

const bodyParser = require('body-parser')

const bycrypt = require('bcryptjs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        const parts = file.mimetype.split("/")
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})

const upload = multer({ storage: storage })
const image = upload.single('Image')

const registerAdmin = async (req, res) => {
    try {
        const obj = {
            userName: req.body.username,
            // Image: {
            //     data: fs.readFileSync('./uploads/' + req.file.filename),
            //     contentType: 'image/png'
            // },
            Email: req.body.email,
            hash: req.body.password,
        }
        const user = new Admin(obj)
        const saveAdmin = await user.save()
        // res.render('./Admin/adminDash')
        const userDetails = {
            userName: user.userName,
            userId: user._id,
            userEmail: user.Email,
        }
        const accessToken = await signAcessToken(user._id)
        const refreshToken = await signRefreshToken(user._id)

        res.send({ auth: true, accessToken, refreshToken, userDetails })

    } catch (error) {
        res.send({ auth: false })
    }

}

const dashBoard = () => {

}

const adminLogin = async (req, res) => {
    const user = await Admin.findOne({ userName: req.body.username }, async function (err, user) {
        if (user == null) {
            res.send('This user doesnt Exists')
        }
        try {
            const verify = await user.isValidPassword(req.body.pw)
            if (verify) {
                const accessToken = await signAcessToken(user._id)
                const refreshToken = await signRefreshToken(user._id)
                const userDetails = {
                    userName: user.userName,
                    userId: user._id,
                    userEmail: user.Email,
                    profile: user.Image
                }
                res.send({ auth: true, accessToken, refreshToken, userDetails })
            } else {
                res.send({ auth: false })
            }

        } catch (error) {
            console.log(error.message)

        }
    }
    )
}

const refreshTokenAdmin = async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) {
            throw createError.BadRequest()
        }
        const userId = await verifyRefreshToken(refreshToken)

        const accessToken = await signAcessToken(userId)
        const ref = await signRefreshToken(userId)
        res.send({ accessToken, refreshToken: ref })
    } catch (error) {
        next(error)
    }
}
module.exports = { registerAdmin, image, dashBoard, adminLogin, refreshTokenAdmin }