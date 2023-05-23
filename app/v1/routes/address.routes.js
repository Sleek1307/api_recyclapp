const express = require('express');
const router = express.Router();

const { createAddress, updateAddress } = require('../../controllers/address.controller');
const { userSigned } = require('../../middlewares/auth.middlewares');

router.post('/address', userSigned, createAddress);
router.put('/address/:id', userSigned, updateAddress);

module.exports = router;