const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const HashTag = require('../models/Hashtag');
const Post = require('../models/Post');


const createPost = async (req, res)=>{
    const {author, place, description, hashtags} = req.body;
    const {filename:image} = req.file;
    
    await sharp(req.file.path)
            .resize(500)
            .jpeg({quality:70})
            .toFile(
                path.resolve(req.file.destination, 'resized', image)
            );
        fs.unlinkSync(req.file.path);
   
    const post = await Post.create({
        author,
        place,
        description,
        image    
    });

    if(hashtags){

        const listHashTag = hashtags.indexOf(' ') !== -1 ? 
                            hashtags.split(' ') : hashtags.indexOf(',') !== -1 ? 
                            hashtags.split(',') : hashtags.indexOf(';') !== -1 ? 
                            hashtags.split(';') : hashtags;

        await Promise.all(listHashTag.map(async hashTag => {
            var auxObj = await HashTag.findOne({hashTag});
            
            if(!auxObj) auxObj = await HashTag.create({hashTag});

            auxObj.posts.push(post);

            await auxObj.save();
                      
            post.hashtags.push(auxObj);
            
        }));

        await post.save();
    } 

    return res.json(post);
}

const index = async (req, res)=>{
                                    
    const posts = await Post.find()
                            .populate('hashtags', 'hashTag') //preenche apenas o id e o campo hastag da referencia da outra coleção, não trazendo assim os posts vinculados a hashtag    
                            .sort('-createdAt');

    return res.json(posts);
}

const userPost = async (req, res)=>{
    const posts = await Post.find({author : req.body.userId})
                            .populate('hashtags', 'hashTag') //preenche apenas o id e o campo hastag da referencia da outra coleção, não trazendo assim os posts vinculados a hashtag    
                            .sort('-createdAt'); 
    return res.json(posts);
}

module.exports = {createPost, index, userPost};