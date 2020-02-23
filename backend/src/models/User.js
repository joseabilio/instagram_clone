const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    user: String,
    name: String,
    bio: String,
    password : String,
    email: String,
    postsLikes: [{type: Schema.Types.ObjectId, ref:'UserLike'}]   
},
{timestamps:true});

module.exports = mongoose.model('User', UserSchema);