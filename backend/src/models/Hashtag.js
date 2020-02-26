const mongoose = require('mongoose');

const HashTagSchema = new mongoose.Schema({
    hashTag : String,
    posts :[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}]
},
{timestamps:true});

module.exports = mongoose.model('HashTag', HashTagSchema);