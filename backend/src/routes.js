const express = require('express');
const multer = require('multer');   
const userController = require('./controllers/UserController');
const uploadsConfig = require('./config/upload');

const routers = new express.Router();
const upload = multer(uploadsConfig);



routers.post('/createuser',upload.single('perfilImage'), userController.createUser);
routers.post('/user/:user', upload.single('newImage'), userController.editUser);
routers.get('/user/:user', userController.perfilUser);
routers.get('/user/:user/:id', userController.confirmEmail);



module.exports = routers;