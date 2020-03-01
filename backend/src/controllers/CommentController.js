const Comment = require('../models/Comment');

const commentCreate = async (req, res)=>{
    var {userId, text} = req.body;
    var {postId} = req.params;

    const comment = await Comment.create({
        post:postId,
        author:userId,
        text 
    });
    req.io.emit('comment', comment);
    return res.json(comment);
}

const getPostComment = async (req, res)=>{
    const comments = await Comment.find({post : req.params.postId})
                                  .populate('author', 'name')  
                                  .sort('-createdAt');
    return res.json(comments);
}

module.exports = {commentCreate, getPostComment};