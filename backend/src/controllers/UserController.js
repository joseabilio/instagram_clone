const User = require('../models/User');
const sendEmail = require('../utils/email');
const resizeImage = require('../utils/image');
const config = require('../config/config');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const createUser = async (req, res)=>{
    var {user, name, bio, password, email} = req.body;
    const {filename:perfilImage} = req.file;
    
    const existUser = await User.findOne({user});
    
    if(existUser){
        fs.unlinkSync(req.file.path);
        return res.status(400).send({error:'The user has a perfil in this site!'});
    }
    else{

        resizeImage(req.file.path);
        
        password = await bcrypt.hash(password, 5);
        const newUser = await User.create({
                                            user,
                                            name,
                                            bio,
                                            password,
                                            email,
                                            perfilImage
                                        });

        sendEmail(email, 
            'Confirm email to user instagram clone', 
            `<h2>Dear ${name}</h2><p>second e-mail <br>
            Please, confirm your e-mail in this link</p>
            <a href="http://localhost:3333/user/${user}/${newUser._id}">http://localhost:3333/user/${user}/${newUser._id}</a>`, 
            `Please, confirm your e-mai to use the instagram clone in this link: http://localhost:3333/user/${user}/${newUser._id}`);


        return res.json(newUser);
    };
};

const confirmEmail = async (req, res)=>{
    const {user, id} = req.params;
    const userAux = await User.findOne({user, _id:id}).catch(err=> {
            return false;
        }
    );
    if(! userAux){
        return res.status(400).send({error:'The data are not corrects!'});
    }else{
        userAux.sit_user = 1;
        await userAux.save();
        return res.json(userAux);
    }
}

const perfilUser = async (req, res)=>{
    const {user} = req.params;
    
    var userAux = await User.findOne({user});
    if(!userAux){
       return res.status(400).send({error:'User not found!'});
    }
    else
    {
        return res.json(userAux);
    }
}

const editUser = async (req, res)=>{
    var {bio, newPassword} = req.body;
    var newImage;
    if (req.file) newImage = req.file.filename;
    const {user} = req.params;

    var userAux = await User.findOne({user});
      
    userAux.bio = bio;
    if (newPassword) {
        userAux.password = await bcrypt.hash(newPassword, 5);
    }
    if(newImage){
        resizeImage(req.file.path);
        //excluindo a imagem de perfil anterior
        fs.unlinkSync(path.resolve(req.file.destination, 'resized', userAux.perfilImage));
        userAux.perfilImage = newImage;
    }
    await userAux.save();

    return res.json(userAux);
 }

 const authenticate = async (req, res) =>{
    const {user, password} = req.body;
    const userauthenticate = await User.findOne({user}).select('+password');
     
    if(!userauthenticate) return res.status(400).send({error:'User not found!'});

    if(!await bcrypt.compare(password, userauthenticate.password)) return res.status(400).send({error:'Invalid Password'});
    
    if(userauthenticate.sit_user != 1) return res.status(400).send({error:'User not activate!'})

    userauthenticate.password = undefined;
    const token = jwt.sign({id:userauthenticate._id}, config.secret,{
        expiresIn:3600,
    });
    return res.send({userauthenticate, token});

 }

 const forgotPassword = async (req, res)=>{
    const {email} = req.body;
    
    const user = await User.findOne({email});

    if(!user) return res.status(400).send({error: 'User not found'});

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);

    user.passwordResetToken = token;
    user.passwordResetExpires = now;
    await user.save();

    sendEmail(email, 
        'Forgot Password', 
        `<h2>Dear ${user.name}</h2><p><br>
        Please, clink in the link to reset your password</p>
        <a href="http://localhost:3333/resetpassword/${token}">http://localhost:3333/resetpassword/${token}</a>`, 
        `Please, reset your password in this link: http://localhost:3333/resetpassword/${token}`);


    return res.send();
 }

//Essa rotina simula um formulário no qual o usuário preenche a nova senha e envia para ser alterada.
//É preciso alterar essa rotina quando o frontend estiver pronto, para apontar para a pagina para o usuário informar a nova senha
const newPassword = async (req, res, next)=>{
    const passwordResetToken = req.params.token; 

    const user = await User.findOne({passwordResetToken}).select('+password');

    if(!user) return res.status(400).send({error:'Invalid Token'}); 
    
    req.body.newPassword = '123456789';
    req.url = `/resetpassword/${passwordResetToken}`;
    req.method = 'POST';

    return resetPassword(req, res, next);
}

const resetPassword = async (req, res)=>{
    const {newPassword} = req.body;
    const passwordResetToken = req.params.token;

    const user = await User.findOne({passwordResetToken}).select('+password');

    if(!user) return res.status(400).send({error:'Invalid Token'});

    if (user.passwordResetExpires > new Date()) return res.status(400).send({error:'The token has expirate'});

    user.password = await bcrypt.hash(newPassword, 5);

    await user.save();

    return res.send();
}

module.exports = {createUser, confirmEmail, authenticate, perfilUser, editUser, forgotPassword, newPassword, resetPassword};