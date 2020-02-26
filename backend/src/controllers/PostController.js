const User = require('../models/Post');
const Post = require('../models/Post');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');


const createPost = (req, res)=>{
    
    return res.json({ok:true});
}

const index = (req, res)=>{
    return res.json({ok:true});
}

const userPost = (req, res)=>{
    return res.json({ok:true});
}

module.exports = {createPost, index, userPost};