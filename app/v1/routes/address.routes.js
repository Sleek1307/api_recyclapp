const express = require('express');
const router = express.Router();

const {createAddress, updateAddress} = require('../../controllers/address.controller')

router.post('/address', createAddress);
router.put('/address/:id', updateAddress);

module.exports = router;