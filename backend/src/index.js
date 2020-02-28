const express = require('express');
const mongoose = require('mongoose');
/*-----==SUPER IMPORTANTE==----- 
Favor criar um arquivo de configuração contendo os dados de acesso ao
seu servidor mongoDb.*/
const config = require('./config/config');


const app = express();

//Substituir o trecho config.moogoStringConnection por sua string de conexão com o seu servidor mongoDb
mongoose.connect(config.moogoStringConnection, 
                 {useNewUrlParser:true, useUnifiedTopology:true}         
                );
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(require('./routes'));
app.listen(3333);