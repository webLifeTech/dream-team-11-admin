const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let teamsSchema = new mongoose.Schema({
    category_id: { type: Schema.Types.ObjectId, ref: 'categories', default: null },
    team_id: { type: String, default: '' },
    team_name: { type: String, default: '' },
    team_short_name: { type: String, default: '' },
    team_logo: { type: String, default: '' },
    position: { type: Number, default: 1 },
    status: { type: Boolean, default: true },
    deleted: { type: Number, default: null },
}, { timestamps: true })

module.exports = mongoose.model('teams', teamsSchema)
