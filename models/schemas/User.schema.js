const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})
