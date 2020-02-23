const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ConnentSchema = new Schema({
    post = {type:Schema.Types.ObjectId, ref:'Post'},
    author={type:Schema.Types.ObjectId, ref:'User'},
    comment:String
},
{timestamps:true});

module.exports = mongoose.model('Comment', ConnentSchema);