const express = require('express');

const routers = new express.Router();

routers.get('/', (req, res)=>{
    return res.send(`Ola ${req.query.name}`);
});

module.exports = routers;