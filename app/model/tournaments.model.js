const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tournamentsSchema = new mongoose.Schema({
    category_id: { type: Schema.Types.ObjectId, ref: 'categories', default: null },
    tournament_id: { type: String, default: '' },
    tournament_name: { type: String, default: '' },
    status: { type: Boolean, default: true },
    deleted: { type: Number, default: null },
}, { timestamps: true })

module.exports = mongoose.model('tournaments', tournamentsSchema)
