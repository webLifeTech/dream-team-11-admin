const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categoriesSchema = new mongoose.Schema({
    category_id: { type: String, default: '' },
    category_name: { type: String, default: '' },
    category_logo: { type: String, default: '' },
    position: { type: Number, default: 1 },
    status: { type: Boolean, default: true },
    deleted: { type: Number, default: null },
}, { timestamps: true })

module.exports = mongoose.model('categories', categoriesSchema)
