const express = require('express');
const router = express.Router();

router.get('/user', (req, res) =>{
    res.send('Estas son las rutas del usuario')
})

module.exports = router;