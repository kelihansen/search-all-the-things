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
                .then(exists => {
                    if(exists) {
                        throw {
                            status: 400,
                            error: 'email in use'
                        };
                    }
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
    ))
    
    .post('/signin', respond(
        ({ body }) => {
            const { email, password } = body;
            delete body.password;

            return User.findOne({ email })
                .then(user => {
                    if(!user || !user.comparePassword(password)) {
                        throw {
                            status: 401,
                            error: 'invalid email or password'
                        };
                    }
                    return { token: sign(user) };
                });
        }
    ));