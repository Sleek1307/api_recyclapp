const express = require('express');
const router = express.Router();

router.get('/post', (req, res) => { 
    res.send('Estas son las rutas  de las publicaciones')
}) 

module.exports = router