const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const houseSchema = new Schema({
    category: String,
    Image1: {
        data: Buffer.from('base64'),
        contentType: String
    },
    Image2: {
        data: Buffer.from('base64'),
        contentType: String
    },
    Image3: {
        data: Buffer.from('base64'),
        contentType: String
    },
    price: Number,
    contact: Number,
    Occupied: Boolean

}, {
    timestamps: true
})

const House = mongoose.model('House', houseSchema)

module.exports = House