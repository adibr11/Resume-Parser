const mongoose = require('mongoose');


const ScamaFile = new mongoose.Schema({
    name: String,
    email: String,
    keywords: [String]
});


module.exports = mongoose.model("Scama", ScamaFile);