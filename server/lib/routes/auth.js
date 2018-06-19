const router = require('express').Router();
const respond = require('./respond');
const User = require('../models/User');
const { sign } = require('../auth/token-service');
const createEnsureAuth = require('../auth/ensure-auth');

module.exports = router

    .post('/signup', respond(
        ({ body }) => {
            const { email, password, name } = body;
            delete body.password;

            return User.exists({ email })
                .then(() => {
                    const user = new User(body);
                    user.generateHash(password);
                    return user.save();
                })
                .then(user => {
                    return { token: sign(user), name };
                });
        }
    ))
    
    .get('/verify', createEnsureAuth(), respond(
        () => Promise.resolve({ verified: true })
    ));