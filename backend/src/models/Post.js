const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    author:{type:Schema.Types.ObjectId, ref:'User'},
    place:String,
    description: String,
    hashtags: [{type: Schema.Types.ObjectId, ref:'HashTag'}],
    comments:[{type:Schema.Types.ObjectId, ref:'Comment'}],
    image: String,
    likes:{
        type: Number,
        default: 0,
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);