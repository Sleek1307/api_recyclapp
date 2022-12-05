const express = require('express');
const router = express.Router();

const {createService} = require('../../controllers/services.controller');

router.post('/services', createService)

module.exports = router;