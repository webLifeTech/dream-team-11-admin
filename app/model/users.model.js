const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new mongoose.Schema({
    firstname: { type: String, default: '' },
    middlename: { type: String, default: '' },
    lastname: { type: String, default: '' },
    username: { type: String, default: '' },
    email: { type: String, default: '' },
    phone_number: { type: String, default: '' },
    profile_photo: { type: String, default: '' },
    password: { type: String, default: '' },
    editedby: { type: Schema.Types.ObjectId, ref: 'users', default: null },
}, { timestamps: true })

module.exports = mongoose.model('users', userSchema)