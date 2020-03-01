const resizeImage = require('../utils/image');
const HashTag = require('../models/Hashtag');
const Post = require('../models/Post');
const User = require('../models/User');

const createPost = async (req, res)=>{
    const {author, place, description, hashtags} = req.body;
    const {filename:image} = req.file;
    
    resizeImage(req.file.path);
   
    const post = await Post.create({
        author,
        place,
        description,
        image    
    });

    if(hashtags){

        const listHashTag = hashtags.replace(',', ' ').replace(';', ' ').replace('  ', ' ').split(' ');
        
        await Promise.all(listHashTag.map(async hashTag => {
            var auxObj = await HashTag.findOne({hashTag});
            
            if(!auxObj) auxObj = await HashTag.create({hashTag});

            await auxObj.save();
                      
            post.hashtags.push(auxObj);
            
        }));

        await post.save();
    } 
    req.io.emit('post', post);
    return res.json(post);
}

const index = async (req, res)=>{
                                    
    const posts = await Post.find()
                            .populate('hashtags', 'hashTag') //preenche apenas o id e o campo hastag da referencia da outra coleção, não trazendo assim os posts vinculados a hashtag    
                            .sort('-createdAt');

    return res.json(posts);
}

const userPost = async (req, res)=>{
    const authorFilter = await User.findOne({user:req.params.user});
    const posts = await Post.find({author:authorFilter})
                            .populate('hashtags', 'hashTag')
                            .sort('-createdAt'); 
    return res.json(posts);
}

const getPostsByHashTag = async (req, res) =>{
    const hastTagFilter = await HashTag.findOne({hashTag:`#${req.params.hashtag}`});
    const posts = await Post.find({hashtags : hastTagFilter})
    .populate('hashtags', 'hashTag') 
    .sort('-likes'); 
    return res.json(posts);

}

module.exports = {createPost, index, userPost, getPostsByHashTag};