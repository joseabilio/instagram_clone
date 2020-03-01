const Post = require('../models/Post');
const UserLike = require('../models/UserLike');

const likeCreate = async (req, res)=>{
    const {userId} = req.body;
    const {postId} = req.params;
    const post = await Post.findById(postId);
   

    //verificando se o usuário já deu like no post atual
    var userLike = await UserLike.findOne({post:postId, user:userId});

    if(!userLike){
        userLike = await UserLike.create({user, post});
        post.likes += 1;
        await post.save();
        
        req.io.emit('like', post);
    }

    return res.json(post);

}

module.exports = {likeCreate};