const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    user: String,
    name: String,
    bio: String,
    password : {
        type:String,
        select:false
    },
    email: String,
    perfilImage : String,
    sit_user:{
        type:Number,
        default:0 //0 - Pendente de Ativação | 1 - Ativo | 2 - Pausado Temporariamente | 3 - Exluido Definitivamente
    },
    passwordResetToken:{
        type: String,
        select: false
    },
    passwordResetExpires:{
        type:Date,
        select:false
    }
},
{timestamps:true});

module.exports = mongoose.model('User', UserSchema);