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
        const itemFind = hashtags.indexOf(' ') !== -1 ? 0 :hashtags.indexOf(',') !== -1 ? 1 : hashtags.indexOf(';') !== -1 ? 2 : 3;
        switch (itemFind){
            case 0 : 
                const listHashTag = hashtags.split(' ');
                break;
            case 1 : 
                const listHashTag = hashtags.split(',');
                break;
            case 2 : 
                const listHashTag = hashtags.split(';');
                break;
        }
     
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