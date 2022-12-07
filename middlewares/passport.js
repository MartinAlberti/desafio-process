const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Users = require('../models/user.mongo');

const UsersModel = new Users();

passport.use('signup', new LocalStrategy(async (username, password, done) => {
    try {
        let newUser = {
            email: username,
            password: await bcrypt.hash(password, 10)
        }
        const user = await UsersModel.save(newUser)
        return done(null, user)
    } catch (error) {
        console.log('Error signing user up...')
        return done(error)
    }
}))

passport.use('login', new LocalStrategy(async (username, password, done) => {
    try {
        const user = await UsersModel.getByEmail(username)
        let isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            console.log('Error login user in...')
            return done(null, false)
        }
        return done(null, user)
    } catch (error) {
        console.log('Error login user in...')
        return done(error)
    }
}))


passport.serializeUser((user, done) => {
    return done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const user = await UsersModel.getById(id)
    return done(null, user)
})

module.exports = passport;