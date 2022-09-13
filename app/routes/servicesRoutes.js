const express = require('express');
const router = express.Router();

router.get('/services', (req, res) =>{
    res.send('Estas son las rutas de los servicios')
})

module.exports = router;