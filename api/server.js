// implement your server here

const express = require('express');
const server = express();

server.use(express.json());

// require your posts router and connect it here

server.get('/', (req, res) => {
    res.status(200).json({
        message: 'root access working'
    })
})

module.exports = server;