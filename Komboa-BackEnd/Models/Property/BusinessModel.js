const mongoose = require('mongoose')

const Schema = mongoose.Schema

const businessSchema = new Schema({
    businessName: {
        type: String,
        lowercase: true,
        required: [true, "Cant be blank"],
        unique: true,
    },
    OwnerId: {
        type: String,
        required: [true, "Cant be blank"]
    }


}, { timestamps: true })

const Business = mongoose.model('Business', businessSchema)

module.exports = Business 