const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tournamentsSchema = new mongoose.Schema({
    category_id: { type: String, default: '' },
    tournament_name: { type: String, default: '' },
}, { timestamps: true })

module.exports = mongoose.model('tournaments', tournamentsSchema)
