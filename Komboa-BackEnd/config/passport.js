const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Admin = require('../Models/Admin/AdminModel')



const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_SECRET_TOKEN
}

const strategy = new JwtStrategy(opts, (jwt_payload, done) => {
    Admin.findOne({ id: jwt_payload.sub })
        .then((user) => {
            if (user) {
                console.log(user.Email)
                return done(null, user)
            }
            else {
                return done(null, false)
            }

        })
        .catch(err => done(err, null))
})

module.exports = (passport) => {
    passport.use(strategy)
}

