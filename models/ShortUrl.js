const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;

const ShortUrlSchema = new Schema({
    url: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
    },
    urlCode: {
        type: String,
        default: shortid.generate,
    }
}, {
    timestamps: true
});

const ShortUrl = mongoose.model('ShortUrl', ShortUrlSchema);

module.exports = ShortUrl;
