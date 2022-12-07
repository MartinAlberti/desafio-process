const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
    title: { type: String},
    thumbnail: { type: String },
    stock: { type: Number },
    price: { type: Number },
    description: { type: String }
})
