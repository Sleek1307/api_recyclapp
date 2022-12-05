const express = require('express');
const router = express.Router();

const { signup, signin, verifyUser, restorePassword, changePassword } = require('./../../controllers/auth.controller.js')

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/restore', restorePassword);
router.post('/change/:token', changePassword);
router.get('/verify/:token', verifyUser);

module.exports = router;