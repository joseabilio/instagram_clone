const User = require('../models/User');
const sendEmail = require('../utils/email');
const resizeImage = require('../utils/image');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');


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

module.exports = {createUser, confirmEmail, perfilUser, editUser};