const jwt = require('jsonwebtoken');
const APP_SECRET = process.env.APP_SECRET;

module.exports = {
    sign(user) {
        const payload = {
            _id: user._id
        };
        return jwt.sign(payload, APP_SECRET);
    },
    verify(token) {
        return jwt.verify(token, APP_SECRET);
    }
};