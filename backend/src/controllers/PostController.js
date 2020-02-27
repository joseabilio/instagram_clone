const User = require('../models/Post');
const Post = require('../models/Post');
const {GetHashTag} = require('./HashTagController');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');


const createPost = (req, res)=>{
    const {author, place, description, hashtags} = req.body;
    const {filename:image} = req.file;
    
    await sharp(req.file.path)
            .resize(500)
            .jpeg({quality:70})
            .toFile(
                path.resolve(req.file.destination, 'resized', image)
            );
        fs.unlinkSync(req.file.path);
    
    if(hashtags){
        const listHashTag = hashtags.indexOf(' ') !== -1 ? 
                            hashtags.split(' ') : hashtags.indexOf(',') !== -1 ? 
                            hashtags.split(',') : hashtags.indexOf(';') !== -1 ? 
                            listHashTag = hashtags.split(';') : hashtags;
    }



    

    return res.json({ok:true});
}

const index = (req, res)=>{
    return res.json({ok:true});
}

const userPost = (req, res)=>{
    return res.json({ok:true});
}

module.exports = {createPost, index, userPost};