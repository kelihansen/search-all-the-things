const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const schema = new Schema({
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    }
});

schema.methods = {
    generateHash(password) {
        this.hash = bcrypt.hashSync(password, 8);
    }
};

module.exports = mongoose.model('User', schema);