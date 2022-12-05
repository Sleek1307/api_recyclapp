const express = require('express');
const { getAllUsers, getOneUser, updateUser, deleteUser, createUser, updatePassword} = require('../../controllers/user.controller');
const router = express.Router();

//get all users
router.get('/users', getAllUsers)

//get one user
router.get('/users/:id', getOneUser)

//create new user
router.post('/users', createUser);

//edit one user
router.patch('/users/:id', updateUser)

//update password of one user
router.put('/update', updatePassword);

//delete one user
router.delete('/users/:id', deleteUser)


module.exports = router;