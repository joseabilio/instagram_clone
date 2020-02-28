const express = require('express');
const multer = require('multer');   
const userController = require('./controllers/UserController');
const uploadsConfig = require('./config/upload');
const postController = require('./controllers/PostController');

const routers = new express.Router();
const upload = multer(uploadsConfig);



routers.get('/', postController.index);
routers.post('/createuser',upload.single('perfilImage'), userController.createUser);
routers.get('/user/:user/:id', userController.confirmEmail);
routers.post('/user/:user', upload.single('newImage'), userController.editUser);
routers.get('/user/:user', userController.perfilUser);
routers.get('/post/:user', postController.userPost);
routers.post('/post', upload.single('image'), postController.createPost);
routers.get('/hashtag/:hashtag', postController.getPostsByHashTag);




module.exports = routers;