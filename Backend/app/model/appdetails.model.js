const mongoose = require('mongoose');
let appDetailsSchema = new mongoose.Schema({
    app_id: { type: String, default: '' },
    app_version: { type: String, default: '' },
    random_ads: { type: String, default: '' },
    app_update: { type: Boolean, default: false },
    is_adsshow: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('app_details', appDetailsSchema)
