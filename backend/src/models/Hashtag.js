const mongoose = require('mongoose');

const HashTagSchema = new mongoose.Schema({
    hashTag : String,
},
{timestamps:true});

module.exports = mongoose.model('HashTag', HashTagSchema);