const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserLikeSchema = new Schema({
    post = {type:Schema.Types.ObjectId, ref:'Post'},
},
{timestamps:true});

module.exports = mongoose.model('UserLike', UserLikeSchema);