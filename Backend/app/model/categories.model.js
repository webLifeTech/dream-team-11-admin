const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categoriesSchema = new mongoose.Schema({
    category_id: { type: String, default: '' },
    category_name: { type: String, default: '' },
    category_logo: { type: String, default: '' },
}, { timestamps: true })

module.exports = mongoose.model('categories', categoriesSchema)
