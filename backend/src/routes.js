const express = require('express');
const multer = require('multer');   
const userController = require('./controllers/UserController');
const uploadsConfig = require('./config/upload');
const postController = require('./controllers/PostController');
const commentController = require('./controllers/CommentController');
const likeController = require('./controllers/LikeController');


const routers = new express.Router();
const upload = multer(uploadsConfig);

routers.get('/', postController.index);

routers.post('/user',upload.single('perfilImage'), userController.createUser);
routers.put('/user/:user/:id', userController.confirmEmail);
routers.get('/user/:user', userController.perfilUser);
routers.put('/user/:user', upload.single('newImage'), userController.editUser);
routers.get('/user/:user/post', postController.userPost);

routers.post('/post', upload.single('image'), postController.createPost);
routers.post('/comment/:postId', commentController.commentCreate);
routers.get('/comment/:postId', commentController.getPostComment);
routers.get('/hashtag/:hashtag', postController.getPostsByHashTag);
routers.post('/post/:postId/like', likeController.likeCreate);




module.exports = routers;