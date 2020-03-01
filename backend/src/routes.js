const express = require('express');
const multer = require('multer');   
const userController = require('./controllers/UserController');
const uploadsConfig = require('./config/upload');
const postController = require('./controllers/PostController');
const commentController = require('./controllers/CommentController');
const likeController = require('./controllers/LikeController');
const authMiddleware = require('./utils/auth');

const routers = new express.Router();
const upload = multer(uploadsConfig);

routers.get('/', authMiddleware, postController.index);
routers.post('/user',upload.single('perfilImage'), userController.createUser);
routers.put('/user/:user/:id', userController.confirmEmail);
routers.post('/authenticate', userController.authenticate);
routers.post('/forgotpassword', userController.forgotPassword);
routers.post('/resetpassword/:token', userController.resetPassword);
routers.get('/resetpassword/:token', userController.newPassword);
routers.get('/user/:user', authMiddleware, userController.perfilUser);
routers.put('/user/:user', authMiddleware, upload.single('newImage'), userController.editUser);
routers.get('/user/:user/post', authMiddleware, postController.userPost);
routers.post('/post', authMiddleware, upload.single('image'), postController.createPost);
routers.post('/comment/:postId', authMiddleware, commentController.commentCreate);
routers.get('/comment/:postId', commentController.getPostComment);
routers.get('/hashtag/:hashtag', authMiddleware, authMiddleware, postController.getPostsByHashTag);
routers.post('/post/:postId/like', authMiddleware, likeController.likeCreate);


module.exports = routers;