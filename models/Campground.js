const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    title: String,
    location: String,
    price: String,
    available: Boolean,
    image: String,
    description: String
})
const Model = mongoose.model('Campground', Schema)
module.exports = Model