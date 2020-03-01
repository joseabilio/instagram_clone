const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
/*-----==SUPER IMPORTANTE==----- 
Favor criar um arquivo de configuração contendo os dados de acesso ao
seu servidor mongoDb.*/
const config = require('./config/config');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);



//Substituir o trecho config.moogoStringConnection por sua string de conexão com o seu servidor mongoDb
mongoose.connect(config.moogoStringConnection, 
                 {useNewUrlParser:true, useUnifiedTopology:true}         
                );

app.use(cors());
app.use((req, res, next)=>{
    req.io = io;
    next();
});

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'rezide')));
app.use(require('./routes'));

server.listen(3333);