const express = require('express');
const multer = require('multer');   
const userController = require('./controllers/UserController');
const uploadsConfig = require('./config/upload');
const postController = require('./controllers/PostController');

const routers = new express.Router();
const upload = multer(uploadsConfig);



routers.get('/', postController.index);
routers.post('/createuser',upload.single('perfilImage'), userController.createUser);
routers.post('/user/:user', upload.single('newImage'), userController.editUser);
//routers.get('/user', userController.userPost);
routers.get('/user/:user', userController.perfilUser);
routers.get('/user/:user/:id', userController.confirmEmail);
routers.post('/post', upload.single('image'), postController.createPost);




module.exports = routers;